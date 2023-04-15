type ShowMoreButtonProps = {
  buttonClickHandler: () => void;
}

export const ShowMoreButton = (props: ShowMoreButtonProps): JSX.Element => (
  <div className="catalog__more">
    <button className="catalog__button" type="button" onClick={props.buttonClickHandler}>Show more</button>
  </div>
);
