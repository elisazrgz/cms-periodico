
const Articles = require("../models/articles.model");
const Users = require("../models/users.model");
const mongoose = require('mongoose');

const getAllPublishedArticles = async (req, res) => {
  try {
    const articles = await Articles.find({ status: 'publish' }) 
      .sort({ date: -1 }) 
      .populate('authorId', 'completeName') // Popula los campos de `authorId`
      .populate('editorId', 'completeName'); // Popula los campos de `editorId`
     
    const newArticle = articles.map((item) => {  
      const article = {
        _id: item._id,
        title: item.title,
        subtitle: item.subtitle,
        date: item.date,
        section: item.section,
        image: item.image,
        body: item.body,
        authorId: item.authorId,
        status: item.status,
        editorId: item.editorId,
        highlight: item.highlight
      }
      return article;
    })

    res.json(newArticle);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

const getArticlesByAuthor = async (req, res) => {
  const authorId = req.params.idA;
  try {
    const author = await Users.findById(authorId);
    if (!author) {
      return res.status(404).json({ message: 'Author not found' });
    }
    const articles = await Articles.find({ authorId: authorId })
      .populate('authorId', 'username completeName')  
      .populate('editorId', 'username completeName');
    if (articles.length === 0) {
      return res.status(404).json({ message: 'Articles not found for this author' });
    }
    return res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getArticlesByEditor = async (req, res) => {
  const editorId = req.params.idE;
  try {
    const editor = await Users.findById(editorId);
    if (!editor) {
      return res.status(404).json({ message: 'Editor not found' });
    }
    const articles = await Articles.find({ editorId: editorId })
      .populate('authorId', 'username completeName')
      .populate('editorId', 'username completeName');

    if (articles.length === 0) {
      return res.status(404).json({ message: 'Articles not found for this editor' });
    }
    return res.json(articles);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const createArticle = async (req, res) => {
  try {
    const { title, subtitle, date, section, body, authorId, status, editorId, highlight } = req.body;
    // const authorExists = await Users.findById(author);
    // if (!authorExists) {
    //   return res.status(404).json({ message: 'El autor no existe' });
    // }
    // no hace falta esta comprobación porque si se puede crear el artículo es porque el autor está loggeado es decir existe

    const newArticle = new Articles({
      title,
      subtitle,
      date,
      section,
      body,
      authorId,
      status,
      editorId,
      highlight
    });

    if (req.file){
      newArticle.image = req.file.path; 
    } // la url es la de cloudinary que ya hemos recibido a través del middleware

    const createdArticle = await newArticle.save();
    return res.status(201).json(createdArticle);

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getArticleById = async (req, res) => {
  try {
    const articleId = req.params.id;
    if (!articleId) {
      return res.status(400).json({ message: "Required ID of article" });
    }
    const foundArticle = await Articles.find({ _id: articleId });
    if (foundArticle.length === 0) {
      return res.status(404).json({ message: "Article not found" });
    }
    res.json(foundArticle);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateArticleContent = async (req, res) => {
  const articleId = req.params.id;
  const updates = req.body;

  try {
    const findArticle = await Articles.findById(articleId);
    if (!findArticle) {
      return res.status(404).json({ msg: 'Article not found' });
    }
    if (req.file){
      updates.image = req.file.path;
    }
    const updatedArticle = await Articles.findByIdAndUpdate(articleId, updates, { new: true });

    return res.status(200).json({ message: 'The article was succesfully modified', updatedArticle});
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const updateArticleStatus = async (req, res) => {
  try {
    const article = await Articles.findById(req.params.id);
    if (!article) {
      return res.status(404).json({ message: 'Article not found' });
    }

    // Solo el writer puede cambiar el estado de 'draft' a 'revisable'
    if (article.status === 'draft') {
      if (req.params.status === 'revisable') {
        article.status = 'revisable';
        await article.save();
        return res.json(article);
      } else {
        return res.status(400).json({ message: 'You are only allowed to send the article to revision' });
      }
    }

    // El editor puede cambiar el estado de 'revisable' a 'draft' o 'publish'
    if (article.status === 'revisable') {
      if (req.params.status && ['draft', 'publish'].includes(req.params.status)) {
        article.status = req.params.status; // Asume que el nuevo status está en req.params.status
        // Si el estado es 'publish', ponemos la fecha actual
        if (article.status === 'publish') {
        article.date = new Date();
        }
        await article.save();
        return res.json(article);
      } else {
        return res.status(400).json({ message: 'You are only allowed to send the article back to drafting or publish it' });
      }
    }

    // Si el status no coincide con ninguna de las reglas anteriores
    return res.status(400).json({ message: 'Action not allowed for this article' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const assignEditor = async (req, res) => { 
  try {
    const idEditor = req.params.idE;
    const idArticle = req.params.idA;
    const article = await Articles.findById(idArticle);
    
    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    if (article.editorId && article.editorId.toString() === idEditor) {
      return res.status(400).json({ message: 'Editor is already assigned' });
    }

    // esto no haría falta porque ya se cambia el status a revisable antes de asignar
    // if (article.status !== 'revisable') {
    // return res.status(400).json({ message: 'Solo se pueden asignar artículos en revisión' });
    // }

    const editor = await Users.findById(idEditor);
    if (!editor || editor.role !== 'editor') {
      return res.status(400).json({ message: 'Editor doesn not exist or is not valid' });
    }
    article.editorId = idEditor;

    const updatedArticle = await article.save();
    return res.status(200).json({ message: 'Editor asignado con éxito', data: updatedArticle });
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const imageUpload = async (req, res) => {
  try{
  const newArticle = new Articles(req.body);
  if(req.file.path){
    newArticle.image = req.file.path;
  }
  const createdArticle = await newArticle.save();
  return res.json(createdArticle);
} catch(error){
  return res.status(500).son({message:"Error al subir la imagen", error:error.message})
}}; // no se usa?



module.exports =  {
  getAllPublishedArticles,
  getArticlesByAuthor, 
  getArticlesByEditor, 
  createArticle, 
  getArticleById, 
  updateArticleContent, 
  updateArticleStatus, 
  assignEditor,
  imageUpload}
