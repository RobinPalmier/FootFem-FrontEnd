import Home from '../Components/Home/Index.jsx';
import Contact from '../Components/Contact/Index.jsx';
import AboutUs from '../Components/AboutUs/Index.jsx';
import SignIn from '../Components/SignIn/Index.jsx';
import SignUp from '../Components/SignUp/Index.jsx';
import Videos from '../Components/Videos/Index.jsx';
import Statistics from '../Components/Statistics/Index.jsx';
import Matches from '../Components/Matches/Index.jsx';
import Match from '../Components/Match/Index.jsx';
import LegalNotice from '../Components/LegalNotice/Index.jsx';
import Groups from '../Components/Groups/Index.jsx';
import Pronostics from '../Components/Pronostics/Index.jsx';
import Profil from '../Components/Profil/Index.jsx';
import Article from '../Components/Article/Index.jsx';
import Team from '../Components/Team/Index.jsx';
import AdministrativePanel from  '../Components/AdministrativePanel/Index.jsx';

export const routesList = [
  { path: "/Home", name: "Home", component: Home },
  { path: "/Contact", name: "Contact", component: Contact },
  { path: "/About-us", name: "About us", component: AboutUs },
  { path: "/Sign-in", name: "Sign in", component: SignIn },
  { path: "/Sign-up", name: "Sign up", component: SignUp },
  { path: "/Matches", name: "Matches", component: Matches },
  { path: "/Groups", name: "Groups", component: Groups },
  { path: "/Statistics", name: "Statistics", component: Statistics },
  { path: "/Videos", name: "Videos", component: Videos },
  { path: "/LegalNotice", name: "LegalNotice", component: LegalNotice },
  { path: "/Match", name: "Match", component: Match },
  { path: "/Pronostics", name: "Pronostics", component: Pronostics },
  { path: "/Profil", name: "Profil", component: Profil },
  { path: "/Article", name: "Article", component: Article },
  { path: "/Team", name: "Team", component: Team },
  { path: "/AdministrativePanel", name: "Administrative Panel", component: AdministrativePanel },
  // prochain à 16 | Ajouter de nouvelle route à partir d'ici pour éviter des bug !!!!
  { redirect: true, path:"/", to:"/Home", name: "Home"}
];
