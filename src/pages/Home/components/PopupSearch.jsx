export default function PopupSearch() {
  return (
    <div id="popup-search-box">
      <div className="box-inner-wrap d-flex align-items-center">
        <form id="form" action="#" method="get" role="search">
          <input id="popup-search" type="text" name="s" placeholder="Type keywords here..." />
        </form>
        <div className="search-close">
          <i className="fa-sharp fa-regular fa-xmark"></i>
        </div>
      </div>
    </div>
  );
}

