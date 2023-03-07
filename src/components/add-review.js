import React, { useState } from "react"
import { Link, useParams, useLocation } from "react-router-dom"

import RestaurantDataService from "../services/restaurant"

const AddReview = props => {
    let initialReviewState = ""
    let editing = false
    const location = useLocation()

    if (location.state && location.state.currentReview) {
        editing = true
        initialReviewState = location.state.currentReview.text
    }

    const [review, setReview] = useState(initialReviewState)
    const [submitted, setSubmitted] = useState(false)
    const params = useParams()

    const handleInputChange = e => {
        setReview(e.target.value)
    }

    const saveReview = async () => {
        let data = {
            user_id: props.user.id,
            name: props.user.name,
            restaurant_id: params.id,
            text: review
        }

        if (editing) {
            data.review_id = location.state.currentReview._id
            try {
                const response = await RestaurantDataService.updateReview(data)
                console.log(response.data)
                setSubmitted(true)
            } catch (e) {
                console.error(e)
            }
        } else {
            try {
                const response = await RestaurantDataService.createReview(data)
                console.log(response.data)
                setSubmitted(true)
            } catch (e) {
                console.error(e)
            }
        }
    }

    return (
        <div>
            {props.user ? (
                <div className="submit-form">
                    {submitted ? (
                        <div>
                            <h1>You submitted successfully!</h1>
                            <Link to={`/restaurants/${params.id}`} className="btn btn-success">
                                Back to Restaurant
                            </Link>
                        </div>
                    ) : (
                        <div>
                            <div className="mb-3">
                                <label htmlFor="text" className="form-label">
                                    {editing ? "Edit" : "Create"} Review
                                </label>
                                <input type="text" name="text" id="text" className="form-control"
                                    required
                                    value={review}
                                    onChange={handleInputChange} />
                            </div>
                            <button onClick={saveReview} className="btn btn-success">
                                Submit
                            </button>
                        </div>
                    )}
                </div>
            ) : (
                <div>Please login.</div>
            )}
        </div>
    )
}

export default AddReview