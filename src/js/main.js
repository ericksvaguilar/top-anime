const url = 'https://api.jikan.moe/v3/top/anime'

const handleError = error => console.error(error)

const handleSucess = ({ data: { top: animes } }) => {
  const animeList = document.querySelector('[data-js="anime-list"]')
  animeList.innerHTML = convertAnimesToLiElements(animes)
}

const convertAnimesToLiElements = animes => {
  return animes.reduce((acc, anime) => {
    return (acc += `
      <li class="anime-list__item">
        <img
          class="anime-list__img"
          src="${anime.image_url}"
          alt="${anime.title} Image"
          width="225px"
          height="350px"
        />
        <h2 class="anime-list__title">
          ${anime.rank}. ${anime.title}
        </h2>
        <div class="anime-list__text">
          <p class="anime-list__score">Score: ${anime.score.toFixed(2)}</p>
          <p>${anime.type} - (${anime.episodes} eps)</p>
          <p>${anime.start_date} - ${anime.end_date ? anime.end_date : ''}</p>
          <p>Members: ${anime.members.toLocaleString('pt-BR')}</p>
        </div>
        
      </li>
    `)
  }, '')
}

axios(url).then(handleSucess).catch(handleError)
