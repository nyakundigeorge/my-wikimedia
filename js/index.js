/**
 * Author: George Nyakundi
 *
 */

/**
 * Language codes
 * en - English
 * es - Spanish
 * vi - Vietnamese
 */

 //
 document.getElementById("search").addEventListener("submit",handleSubmit,false);

 let isLoading = false;


 async function handleSubmit(e){
    document.getElementById('submitButton').disabled = true;
     e.preventDefault();
     let metadataRes = await fetchInfo('metadata');
     let wikiRes  = await fetchInfo('summary')
     let wikiUrl = ''

     if(wikiRes && wikiRes.title !="Not found." ){
        wikiUrl = getWikiUrls(wikiRes);
    }else{
       document.getElementById("container-main-content").innerHTML = 'Document Not Found'
       document.getElementById('submitButton').disabled =  false
       return
    }

     if(metadataRes && !metadataRes.title){
         //generate table of contents
        generateTOC(metadataRes,wikiUrl)
        document.getElementById('submitButton').disabled =  false
     }else{
         document.getElementById("container-content-navigation").innerHTML = 'Document Not Found'
         document.getElementById('submitButton').disabled =  false
         return
     }
 }

 /**
  * Fetches a particular resource from the api
  * @param {*} requestOption
  */
 async function fetchInfo(requestOption){
     let articleName = document.getElementById("articleName").value;
     let lang = document.getElementById("lang").value;
     if(!requestOption){
         return
     }
     if(articleName && articleName.trim().length > 3){
        const response = await fetch(`https://${lang}.wikipedia.org/api/rest_v1/page/${requestOption}/${articleName}`,
        {
            mode:'cors',
            headers:{
                'Content-Type':'application/json'
            }
        });
        const results = await response.json()
        return results

     }else{
         return {"title": "Not found."}
     }
 }

/**
 * Function to fetch the wiki urls for a particular article
 * @param {*} resultsObj
 */
  function getWikiUrls(resultsObj){
    if(resultsObj && resultsObj.title !='Not found.'){

        if(isMobile()){
            let {content_urls: {mobile:{page}}} = resultsObj;
            return page
        }else{
            let {content_urls: {desktop:{page}}} = resultsObj;
            return page
        }
    }else{
        document.getElementById("container-content-navigation-toc").innerHTML = 'Summary Not Found'
    }
 }

 async function generateTOC(resultsObj,wikiUrl){
    let {toc : {title, entries }} = resultsObj;
    let tocList = entries.map(entry => {
        let tabspaces = ''
        if(entry.level > 1){
            let tab = "&ensp;"
             tabspaces = tab.repeat(parseInt(entry.level));
        }
        return `<a href='${wikiUrl}#${entry.anchor}' target='_blank'><li>${tabspaces}${entry.level}.${entry.section}. ${entry.html}</li></a>`
    }).join("")
    document.getElementById("container-content-navigation-toc").innerHTML = tocList;
    document.getElementById("container-content-navigation-title").innerHTML = title;
 }

/**
 * Utility function to check the viewport size and fetch resource accordingly
 */

function isMobile(){
    return window.matchMedia("(max-width: 700px)").matches
}