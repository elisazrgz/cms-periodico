import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const writerGuard: CanActivateFn = (route, state) => {
  const roleValue = localStorage.getItem("role");
  const router: Router = inject(Router);
  
  if(roleValue === "writer"){
      return true;
  } else {
    alert("La ruta a la que quieres acceder está protegida para redactores")  
    router.navigate(["auth/login"])
      return false
  }
};
