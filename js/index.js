/**
 * Author: George Nyakundi
 *  Handles all network requests
 */

 // returns an latest html of the page.
/**
 * Language codes
 * en - English
 * es - Spanish
 * vi - Vietnamese
 */
 

 let wikipedia_latest_html_url = 'https://en.wikipedia.org/api/rest_v1/page/html/';
 let wikipedia_metadata_html_url = 'https://en.wikipedia.org/api/rest_v1/page/metadata/'

 //example request: https://en.wikipedia.org/api/rest_v1/page/metadata/Daniel Moi


 async function fetchMetadata(e){
     e.preventDefault()
     alert("Fetch Button clicked")
    // return await fetch();
 }