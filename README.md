# InstaMERN

The InstaMERN frontend is built using React, React-Query, Redux, React-Router, and Tailwind CSS. It provides a user-friendly interface for users to interact with the InstaMERN social media platform.

[![InstaMERN](/public/logo.png)](https://instamern.netlify.app)

## API

### InstaMERN Backend API

The InstaMERN Backend API serves as the core of the InstaMERN platform, providing user authentication, data management, **AWS Cloud** and more. Explore the API documentation for detailed information on endpoints, usage, and integration.

- [instamern-api](https://github.com/hsyntes/instamern-api)

## Technologies Used

React: A JavaScript library for building user interfaces, providing a component-based architecture and efficient rendering.

React-Query: A data-fetching library for React applications, enabling seamless data management and caching.

Redux: A state management library, enabling centralized data storage and easy state updates.

React-Router: A routing library for React applications, enabling navigation and URL handling.

Tailwind CSS: A utility-first CSS framework, providing a set of pre-defined classes for styling components.

### Dark & Light Theme according to device settings

![logo](/src/screenshots/desktop-dark.png)

![logo](/src/screenshots/desktop-light.png)

<br />

## React-Query Integration

React-Query is used to fetch and manage data in the frontend. The library provides hooks for fetching data from the backend API, caching responses, and handling loading and error states.

## Redux Integration

Redux is used for global state management in the frontend. It stores user authentication information, such as the JWT token, and manages user-related actions like logging in and logging out.

## React-Router Integration

React-Router is used for client-side routing, allowing smooth navigation between different pages and managing URLs for specific content.

## Tailwind CSS Styling

Tailwind CSS classes are used to style the components, providing a consistent and responsive design throughout the application.

### Responsive Design

![logo](/src/screenshots/mobile-dark.png)&emsp;![logo](/src/screenshots/mobile-light.png)

<br />

## Powerful & Fast MongoDB Atlas Search Engine

![logo](/src/screenshots/search-mobile-dark.png)&emsp;![logo](/src/screenshots/search-mobile-light.png)

<br />

## Authentication

User authentication is managed using JWT tokens obtained from the backend upon successful login. The JWT token is stored in the **Secure Response Headers** and included in the Authorization header for protected API requests also hashing passwords and save them to **MongoDB**

![logo](/src/screenshots/signup-mobile-dark.png)&emsp;![logo](/src/screenshots/signup-mobile-light.png)

<br />

### Uploading & Loading Images via AWS Cloud

![logo](/src/screenshots/upload-post-desktop-dark.png)

![logo](/src/screenshots/upload-story-mobile-dark.png)&emsp;![logo](/src/screenshots/upload-story-mobile-light.png)

<br />

## Notifications via MongoDB

![logo](/src/screenshots/notifications-mobile-dark.png)&emsp;![logo](/src/screenshots/notifications-mobile-light.png)

<br />

This documentation provides an overview of the frontend technologies used, project structure, and key components and pages in the InstaMERN frontend. Developers can explore the source code for more in-depth details on how each component, library, and feature is implemented.

## 🔗 Links

[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/hsyntes)
