// import fetchApi from './common/fetch'
// import './common/global.css'
// import './index.css'

// const mainElement = document.querySelector('.main')

// fetchApi('/posts').then(data => {
//   mainElement.innerHTML = '' // remove loading

//   data.forEach(item => {
//     const article = document.createElement('article')
//     article.className = 'post'

//     const h2 = document.createElement('h2')
//     h2.textContent = item.title
//     article.appendChild(h2)

//     const paragraph = document.createElement('p')
//     paragraph.textContent = item.body
//     article.appendChild(paragraph)

//     mainElement.appendChild(article)
//   })
// })



const update = () => {
  const hash = window.location.hash || '#posts'
  const mainElement = document.querySelector('.main')
  mainElement.innerHTML = ''
  if (hash === '#posts') {
    // mainElement.appendChild(posts())
    import('./posts/posts').then(({ default: posts }) => {
      mainElement.appendChild(posts())
    })
  } else if (hash === '#album') {
    // mainElement.appendChild(album())
    import('./album/album').then(({ default: album }) => {
      mainElement.appendChild(album())
    })
  }
}
window.addEventListener('hashchange', update)
update()
