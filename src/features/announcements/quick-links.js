import tee from "../../assets/img/tee2.jpg"

function QuickLinks() {
  return (
    <div className="listview listview--hover">
      <a
        className="listview__item"
        href="https://bookit.activegolf.com/book-bunker-hills-gc-tee-times/1114"
        rel="noreferrer"
        target="_blank"
      >
        <img alt="Make tee times at Bunker Hills" className="listview__img" src={tee} />
        <div className="listview__content">
          <div className="listview__heading">Bunker Hills Tee Times</div>
        </div>
      </a>
      <a
        className="listview__item"
        href="https://bunkerhillsgolf.com/"
        rel="noreferrer"
        target="_blank"
      >
        <img alt="Bunker Hills website home" className="listview__img" src={tee} />
        <div className="listview__content">
          <div className="listview__heading">Bunker Hills Home</div>
        </div>
      </a>
      <a className="listview__item" href="https://mpga.net/" rel="noreferrer" target="_blank">
        <img alt="MPGA website home" className="listview__img" src={tee} />
        <div className="listview__content">
          <div className="listview__heading">Minnesota Public Golf Association</div>
        </div>
      </a>
      <a
        className="listview__item"
        href="https://www.mngolf.org/home"
        rel="noreferrer"
        target="_blank"
      >
        <img alt="MGA website home" className="listview__img" src={tee} />
        <div className="listview__content">
          <div className="listview__heading">Minnesota Golf Association</div>
        </div>
      </a>
      <a
        className="listview__item"
        href="https://www.usga.org/rules/rules-and-decisions.html"
        rel="noreferrer"
        target="_blank"
      >
        <img alt="USGA Rules of Golf" className="listview__img" src={tee} />
        <div className="listview__content">
          <div className="listview__heading">Rules of Golf</div>
        </div>
      </a>
      <a
        className="listview__item"
        href="https://www.ghin.com/default.aspx"
        rel="noreferrer"
        target="_blank"
      >
        <img alt="GHIN website home" className="listview__img" src={tee} />
        <div className="listview__content">
          <div className="listview__heading">Handicaps (GHIN)</div>
        </div>
      </a>
    </div>
  )
}

export { QuickLinks }
