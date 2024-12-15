import { Routes } from '@angular/router';
import { LogIn } from './LogIn/login.component';
import { Article } from './Article/article.componet';
import { Property } from './Property/property.component';
import { Home } from './Home/home.component';
import { Blog } from './Blog/blog.component';
import { Contact } from './Contact/contact.component';
import { Partners } from './Partners/partners.component';
import { Inquery } from './Inquery/inquery.component';
import { Properties } from './Properties/properties.component';
import { MyProfile } from './MyProfile/my-profile.componet';
import { Registration } from './Registration/registration.componet';
import { Inqueries } from './Inqueries/inqueries.componet';
import { PropertyInformation } from './PropertyInformation/property-information.component';
import { News } from './News/news.component';
import { Daria } from './Daria/daria.component';
import { Place } from './Place/place.component';

export const routes: Routes = [
    {title: "Вход", path: 'Log', component: LogIn },
    {title: "Статии", path: 'Article', component: Article },
    {title: "Имот", path: 'Property', component: Property },
    {title: 'K-Konsult', path: '', component: Home}, 
    {title: "Блог", path: 'Blog', component: Blog },
    {title: "За нас", path: 'Contact', component: Contact },
    {title: "Партньори", path: 'Partners', component: Partners },
    {title: "Запитвания", path: 'Inquery', component: Inquery },
    {title: "Моят Профил", path: 'MyProfile', component: MyProfile },
    {title: "Регистрация", path: 'Registration', component: Registration },
    {title: "Заявки", path: 'Inqueries', component: Inqueries },
    {title: "Имот", path: 'PropertyInformation', component: PropertyInformation },
    {title: "Статия", path: 'news/:articleTitle', component: News },
    {title: "Имоти", path: 'Properties/:category', component: Properties },
    {title: "Имоти", path: 'Properties/:category/:type', component: Properties },
    {title: "DariaResidance", path: 'Daria', component: Daria },
    {title: "Градове и квартали", path: 'Place', component: Place },


];
