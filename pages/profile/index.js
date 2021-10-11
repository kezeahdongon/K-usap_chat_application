// SERVER SCRIPTS
import { firebase_blogs, firebase_blog } from "./modules/firebase/getBlog.js";
// COMPONENT
import { blogItem } from './modules/component/blogItem.js'
import { menuItems } from "./modules/component/headerMenu.js";

const APP = (() => {
    document.addEventListener('DOMContentLoaded', init);

    let currentShown = 3;

    function init(){
        document.querySelector('header').innerHTML += menuItems(false);
        addEventListeners();
        getData(currentShown,afterFetch);
    }

    // INTERACTIONS
    function addEventListeners() {
        const elbtnA = document.querySelector('#btnA');
        const blogElement = document.querySelector('#all_blogs');
        // SHOW MORE
        elbtnA.addEventListener('click', () => {
            const blog = firebase_blog(currentShown);
            blogElement.innerHTML += blogItem(blog.id,blog.title,blog.content);
            currentShown += 1;
        });
    }

    function getData(blogCount,cb) {
        const blogs = firebase_blogs(blogCount);
        cb(blogs)
    }

    // INITIAL VIEW
    function afterFetch(blogs) {
        let blogElement = document.querySelector('#all_blogs');
        
        let blogElementContent = '';

        for(let i = 0; i < blogs.length; i++) {
            blogElementContent += blogItem(blogs[i].id,blogs[i].title,blogs[i].content);
        }
        blogElement.innerHTML = blogElementContent;
    }

    return {
        getData,
        afterFetch
    }
})();