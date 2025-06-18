# RickAndMorty
 
An app created with **React**, **TypeScript**, and **Vite** to search and display character information.

**Deploy**: [https://sweet-sprite-a0a307.netlify.app/](https://sweet-sprite-a0a307.netlify.app/)

## Table of Contents

- [General Info](#general-info)
- [Technologies](#technologies)
- [Features](#features)
- [Setup](#setup)

## General Info

This project is a simple search application where users can search for characters by name and view the results.

## Technologies

The project is created with:

- **React**: v19.0.0
- **TypeScript**: v5.7.2
- **React-router-dom**: v7.1.5
- **Axios**: v1.7.9
- **Vite**: v6.1.0
- **@tanstack/react-query**: v5.66.0

## Features

1. **Search Functionality**
   - Users can enter a character's name in the search field.
   - The input automatically focuses on page load for better user experience.
2. **Real-time API Search**
   - After typing 3 or more characters and pressing "search" or enter, a request is sent to fetch matching results.
   - Additional filters are also available:
     - name: filter by the given name.
     - status: filter by the given status (alive, dead or unknown).
     - species: filter by the given species.
     - type: filter by the given type.
     - gender: filter by the given gender (female, male, genderless or unknown).
   - Results are displayed on the same page as a list of cards.
3. **Navigation to Details Page**
   - Clicking on any card leads to a detailed view using the URL provided by the API.

## Setup

To run this project, download and install it locally using npm:

```
$ git clone https://github.com/Anna1719/RickAndMorty.git
$ cd ./RickAndMorty
$ npm install
$ npm start
```