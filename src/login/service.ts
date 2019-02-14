import { pbkdf2Sync } from 'pbkdf2';
import { sign } from 'jsonwebtoken';
import { v4 } from 'uuid';
import { User, IJWToken } from './model';

const secret = process.env.JWT_SECRET || 'my@#$secret';

export class Service {

    public async loginUser(email: string, password: string): Promise< IJWToken | null > {
        const user = await User.findOne({ where: { email } });
        let token = null;
        if (user && this.comparePassword(user.password, password)) {
            token = {
                token: sign({
                    id: user.id,
                    password,
                    first_name: user.first_name,
                    last_name: user.last_name,
                    email: user.email,
                    scopes: ['project:read']
                }, secret, { expiresIn: 1440 }),
                first_name: user.first_name,
                last_name: user.last_name,
                email: user.email,
            };
        }
        return token;
    }
    
    public hashPassword(password: string) {
        const salt = v4().replace(/-/g, '').substring(0, 16);
        const pwHash = pbkdf2Sync(password, salt, 1000, 20, 'sha512').toString('hex');
        return `pbkdf2(1000,20,sha512)$${salt}$${pwHash}`;
    }

    private comparePassword(storedPassword: string, submittedPassword: string): boolean {
        const members: string[] = storedPassword.split('$');
        if (members && members.length === 3) {
            const pbkdf2Ssetting = members[0].match(/pbkdf2\((.*)\)/);

            if (pbkdf2Ssetting && pbkdf2Ssetting.length > 1) {
                const cryptSettings = pbkdf2Ssetting[1].split(',');
                const salt          = members[1];
                const storedHash    = members[2];
                const pwHash        = pbkdf2Sync(submittedPassword,
                                                 salt,
                                                 parseInt(cryptSettings[0], 10),
                                                 parseInt(cryptSettings[1], 10),
                                                 cryptSettings[2]).toString('hex');
                return pwHash === storedHash;
            }
        }
        return false;
    }
    
}

export const LoginService = new Service();
