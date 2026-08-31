import { HttpInterceptorFn } from "@angular/common/http";
import { AuthService } from "../services/auth.service";
import { inject } from "@angular/core";

export const authInterceptor:HttpInterceptorFn = (req, netx) =>{
    const authService = inject(AuthService);
    const token = authService.obtenerToken();

    const methodsPublics = ['GET'];

    //No enviar token al endpoint de login
    if(req.url.includes('/auth/login')){
        return netx(req);
    }

    if(token && !methodsPublics.includes(req.method)){
        const cloneRequest = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return netx(cloneRequest);
    }
    return netx(req);
}