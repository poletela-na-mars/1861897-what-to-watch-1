import {ChangeEvent, Fragment, useState} from 'react';

export const ReviewForm = () => {
  const [reviewData, setReviewData] = useState({rating: 8, text: '',});

  const handleInputChange = (evt: ChangeEvent<HTMLTextAreaElement> | ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setReviewData({...reviewData, [name]: value});
  };

  return (
    <div className="add-review">
      <form action="#" className="add-review__form">
        <div className="rating">
          <div className="rating__stars">

            {[...Array(10).keys()].reverse().map((rating) => (
              <Fragment key={rating}>
                <input className="rating__input" id={`star-${rating}`} type="radio" name="rating" value={rating} onChange={handleInputChange} />
                <label className="rating__label" htmlFor={`star-${rating}`}>Rating {rating}</label>
              </Fragment>
            ))}
          </div>
        </div>

        <div className="add-review__text">
          <textarea className="add-review__textarea" name="text" id="review-text" placeholder="Review text" value={reviewData.text} onChange={handleInputChange} />
          <div className="add-review__submit">
            <button className="add-review__btn" type="submit">Post</button>
          </div>
        </div>
      </form>
    </div>
  );
};
