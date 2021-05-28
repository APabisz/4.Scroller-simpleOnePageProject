class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector)
    this.sections = document.querySelectorAll("#root .section")

    const currentSectionIndex = [...this.sections].findIndex((el) =>
      this.isScrolledIntoView(el)
    )
    this.currentSectionIndex = Math.max(currentSectionIndex, 0)
    this.isThrottled = false

    this.drawNavigation()
  }

  isScrolledIntoView(el) {
    const rect = el.getBoundingClientRect()
    const elemTop = rect.top
    const elemBottom = rect.bottom

    const isVisible =
      elemTop >= 0 && elemBottom <= Math.floor(window.innerHeight)
    return isVisible
  }

  listenScroll = (e) => {
    if (this.isThrottled) return
    this.isThrottled = true

    setTimeout(() => (this.isThrottled = false), 800)

    const direction = e.deltaY > 0 ? 1 : -1

    this.scroll(direction)
  }

  scroll = (direction) => {
    if (direction === 1) {
      const isLastSection =
        this.currentSectionIndex === this.sections.length - 1
      if (isLastSection) return
    } else if (direction === -1) {
      const isFirstSection = this.currentSectionIndex === 0
      if (isFirstSection) return
    }

    this.currentSectionIndex += direction

    this.scrollToCurrentSection()
  }

  scrollToCurrentSection = () => {
    this.selectActiveNavItem()
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }

  drawNavigation = () => {
    this.navigationContainer = document.createElement("aside")
    this.navigationContainer.setAttribute("class", "scroller")
    const list = document.createElement("ul")
    list.className = "scroller__list"
    this.sections.forEach((section, index) => {
      const listItem = document.createElement("li")
      listItem.className = "scroller__item"
      listItem.addEventListener("click", () => {
        this.currentSectionIndex = index
        this.scrollToCurrentSection()
      })
      list.appendChild(listItem)
    })
    this.navigationContainer.appendChild(list)
    document.body.appendChild(this.navigationContainer)
    this.selectActiveNavItem()
  }

  selectActiveNavItem = () => {
    if (this.navigationContainer) {
      const navItems = this.navigationContainer.querySelectorAll("li")
      navItems.forEach((item, index) => {
        if (index === this.currentSectionIndex) {
          item.classList.add("scroller__item--active")
        } else {
          item.classList.remove("scroller__item--active")
        }
      })
    }
  }
}
