class Scroller {
  constructor(rootSelector) {
    const rootElement = document.querySelector(rootSelector)
    this.sections = document.querySelectorAll("#root .section")

    const currentSectionIndex = [...this.sections].findIndex((el) =>
      this.isScrolledIntoView(el)
    )
    this.currentSectionIndex = Math.max(currentSectionIndex, 0)
    this.isThrottled = false
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
    this.sections[this.currentSectionIndex].scrollIntoView({
      behavior: "smooth",
      block: "start",
    })
  }
}
