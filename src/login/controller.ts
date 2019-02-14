import {Tags, Route, Controller, Post, Body, SuccessResponse, Response } from 'tsoa';
import { LoginService } from './service';
import { IJWToken, ILoginData } from './model';

@Route('login')
@Tags('User')
export class LoginController extends Controller {

    /**
     * Login user
     *
     * @summary Login user
     * 
     * @param {string} email user email address
     * @param {string} password user password
     */
    @SuccessResponse('200', 'OK')
    @Response('401', 'Unathorized')
    @Post()
    @Tags('Post')
    public async loginUser(@Body() requestBody: ILoginData): Promise< IJWToken | null > {
        return LoginService
                .loginUser(requestBody.email, requestBody.password)
                .then((result) => {
                    if (result) {
                        return result;
                    } else {
                        this.setStatus(401);
                        return {name: 'InvalidLogin', message: 'Login failed'};
                    }
                })
                .catch((err) => err);
    }
}
