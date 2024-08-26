export interface Identity {
  name: string;
  image: string;
}

export interface NavBar extends Identity {
  links: string[];
}

export interface Home {
  introduction: string;
  resumeLink: string;
  typedElement: string[];
}

export interface NavTab {
  id: string;
  name: string;
  placement: string;
}

export interface About extends Identity {
  NavTabs: NavTab[];
  about: {
    "tech-stats": string;
    bio: string;
    "IDE, Editors & Tools": string[];
  };
  skills: Skill[][];
  education: Education[];
}

export interface Skill {
  skill: string;
  progress: string;
}

export interface Education {
  animationClass: string;
  textAlignment: string;
  degree: string;
  college: string;
  duration: string;
  percentage: string;
}

export interface Quote {
  author: string;
  quote: string;
}

export interface PortfolioItem {
  animationClass: string;
  delay: string;
  project: string;
  description: string;
  placement: string;
}

export interface Training {
  background: string;
  sun: string[];
  developTime: DevelopTime[];
  moon: Moon;
  training: TrainingItem[][];
}

export interface DevelopTime {
  time: string;
  style: {
    left: string;
    top: string;
  };
}

export interface Moon {
  dot: string[];
  name: string[];
}

export interface TrainingItem {
  class: string;
  title: string;
  subtitle: string;
  date: string;
  description: string;
  link: string;
}

export interface Achievement {
  animationClass: string;
  description: string;
  image: string;
}

export interface ContactLink {
  type: string;
  title: string;
}

export interface Contact {
  animationClass: string;
  title: string;
  icon: string;
  links: ContactLink[];
}

export interface SocialLink {
  link: string;
  class: string;
  name: string;
  placement: string;
}

export interface Footer {
  dev: {
    name: string;
    link: string;
    image: string;
  };
  citation: Identity & {
    animationClass: string;
    icon: string;
  };
}

export interface Data {
  identity: Identity;
  NavBar: NavBar;
  Home: Home;
  About: About;
  Quote: Quote[];
  Portfolio: PortfolioItem[];
  Training: Training;
  Achievement: Achievement[];
  Contact: Contact[];
  Social: SocialLink[][];
  Footer: Footer;
}
