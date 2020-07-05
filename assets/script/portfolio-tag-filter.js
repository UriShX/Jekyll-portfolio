const allProjects = document.querySelectorAll('.portfolio-block')
const portfolioTagsNodelist = document
  .querySelector('.portfolio-tags')
  .querySelectorAll('a')

let portfolioTags = []
for (let ref of portfolioTagsNodelist) {
  const href = ref.getAttribute('href')
  portfolioTags.push(href.split('#')[1])
}

window.addEventListener('hashchange', () => {
  const locHashId = window.location.hash.split('#')[1]
  if (typeof locHashId === 'undefined') {
    // console.log('All')
    sortPortfolioBlocksLeftRight(allProjects)
    unHidePotfolioBlocks()
  } else if (portfolioTags.indexOf(locHashId) > 0) {
    // console.log(locHashId)
    const projectsWithLocId = document.querySelectorAll('.' + locHashId)
    const projectSToHide = projectFilter(projectsWithLocId)

    unHidePotfolioBlocks()
    sortPortfolioBlocksLeftRight(allProjects)

    for (const p of projectSToHide) {
      p.classList.replace('portfolio-block', 'portfolio-hidden')
    }

    sortPortfolioBlocksLeftRight(projectsWithLocId)
  }
})

function unHidePotfolioBlocks() {
  for (const p of allProjects) {
    if (p.classList.contains('portfolio-hidden')) {
      p.classList.replace('portfolio-hidden', 'portfolio-block')
    }
  }
}

function sortPortfolioBlocksLeftRight(blockList) {
  for (let i = 0; i < blockList.length; i++) {
    if (blockList[i].classList.contains('portfolio-l') && i % 2 == 0)
      blockList[i].classList.replace('portfolio-l', 'portfolio-r')
    else if (blockList[i].classList.contains('portfolio-r') && i % 2 != 0)
      blockList[i].classList.replace('portfolio-r', 'portfolio-l')
  }
}

let projectFilter = (foundProjects) => {
  let filteredProjects = []
  // console.log(allProjects)

  for (const project of allProjects) {
    var boolMarker = false
    for (const p of foundProjects) {
      if (project.isSameNode(p)) {
        boolMarker = true
        break
      }
    }
    if (!boolMarker) filteredProjects[filteredProjects.length] = project
  }

  // console.log(filteredProjects)
  return filteredProjects
}
