import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"

import RestaurantDataService from "../services/restaurant"

const RestaurantsList = props => {
    const [restaurants, setRestaurants] = useState([])
    const [cuisines, setCuisines] = useState(["All Cuisines"])
    const [searchName, setSearchName] = useState("")
    const [searchZip, setSearchZip] = useState("")
    const [searchCuisine, setSearchCuisine] = useState("")

    // hook that tells react what to do after render
    useEffect(() => {
        retrieveRestaurants()
        retrieveCuisines()
    }, [])

    const retrieveRestaurants = async () => {
        try {
            const response = await RestaurantDataService.getAll()
            console.log(response.data)
            setRestaurants(response.data.restaurants)
        } catch (e) {
            console.error(e)
        }
    }


    const retrieveCuisines = async () => {
        try {
            const response = await RestaurantDataService.getCuisines()
            console.log(response.data)
            setCuisines(["All Cuisines"].concat(response.data))
        } catch (e) {
            console.error(e)
        }
    }

    const onChangeSearchName = e => {
        const searchName = e.target.value
        setSearchName(searchName)
    }

    const onChangeSearchZip = e => {
        const searchZip = e.target.value
        setSearchZip(searchZip)
    }

    const onChangeSearchCuisine = e => {
        const searchCuisine = e.target.value
        setSearchCuisine(searchCuisine)
    }

    const refreshList = () => {
        retrieveRestaurants()
    }

    const find = async (query, by) => {
        try {
            const response = await RestaurantDataService.find(query, by)
            console.log(response.data)
            setRestaurants(response.data.restaurants)
        } catch (e) {
            console.error(e)
        }
    }

    const findByName = () => {
        find(searchName, "name")
    }
    const findByZip = () => {
        find(searchZip, "zipcode")
    }
    const findByCuisine = () => {
        if (searchCuisine === 'All Cuisines') {
            refreshList()
        } else {
            find(searchCuisine, "cuisine")
        }
    }

    return (
        <div className="container">
            <div className="row pb-1">
                <div className="input-group col-lg">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by name"
                        onChange={onChangeSearchName}
                        value={searchName} />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByName}>Search</button>

                </div>
                <div className="input-group col-lg">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by zip"
                        onChange={onChangeSearchZip}
                        value={searchZip} />
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByZip}>Search</button>
                </div>
                <div className="input-group col-lg">
                    <select className="form-select" onChange={onChangeSearchCuisine}>
                        {cuisines.map(cuisine => {
                            return (
                                <option value={cuisine}>{cuisine.substring(0, 20)}</option>
                            )
                        })}
                    </select>
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={findByCuisine}>Search</button>
                </div>
            </div>
            <div className="row">
                {restaurants.map((restaurant, index) => {
                    const address = `${restaurant.address.building} ${restaurant.address.street} ${restaurant.address.zipcode}`
                    return (
                        <div className="col-lg-4 pb-1" key={index}>
                            <div className="card">
                                <div className="card-body">
                                    <h5 className="card-title">{restaurant.name}</h5>
                                    <p className="card-text">
                                        <strong>Cuisine: </strong>{restaurant.cuisine}<br />
                                        <strong>Address: </strong>{address}
                                    </p>
                                    <div className="row">
                                        <Link to={`/restaurants/${restaurant._id}`}
                                            className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Reviews
                                        </Link>
                                        <a target="_blank" href={`https://www.google.com/maps/place/${address}`} className="btn btn-primary col-lg-5 mx-1 mb-1">
                                            View Map
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default RestaurantsList