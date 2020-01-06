/* eslint-disable class-methods-use-this */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import dotenv from 'dotenv';
import { Redirect } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import InputField from '../../../components/InputField';
import { createAccommodationList } from '../../../constants/accommodation';
import SubmitButton from '../../../components/SubmitButton';
import Spinner from '../../../components/Spinner';
import {
  updateSpinnerStatus,
  roomsModalAction,
  newAccommodationPhotos,
  newAccommodationInput,
  getCitiesAction,
  createAccommodationAction,
} from '../../../redux/actions/createAccommodationActions';
import Modal from '../../../components/modal';


dotenv.config();
export class CreateAccommodation extends Component {
  componentDidMount() {
    this.props.getCitiesAction();
  }

  addRooms() {
    this.props.roomsModalAction(true);
  }

  uploadWidget(e) {
    e.preventDefault();
    const cloudinaryWidget = cloudinary.createUploadWidget(
      {
        cloudName: 'victorkarangwa4',
        uploadPreset: 'ollljekm',
      },
      (error, result) => {
        const photoList = document.getElementById('photos');
        photoList.innerHTML = ' ';
        if (!error && result && result.event === 'success') {
          const { info: img } = result;
          this.props.newAccommodationPhotos(img.url);
        }
        photoList.innerHTML = 'New photos added!';
      },
    );
    cloudinaryWidget.open();
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.updateSpinnerStatus(true);
    const {
      rooms,
      photos: imageUrls,
      name,
      googleCoordinates,
      description,
      city,
      address,
    } = this.props.stateObject.accommodation.createAccommodation;
    const payload = {
      name,
      cityId: parseInt(city, 10),
      address,
      googleCoordinates,
      imageUrls,
      description,
      rooms,
    };
    this.props.createAccommodationAction(payload);
  }

  handleChange(e, className) {
    const singleInput = {};
    singleInput[className] = e.target.value;
    this.props.newAccommodationInput(singleInput);
  }

  render() {
    const {
      retrievedCities,
    } = this.props.stateObject.accommodation.createAccommodation;
    return (
      <div>
        {this.props.stateObject.accommodation.createAccommodation.payload && <Redirect to="/dashboard" />}
        {this.props.stateObject.accommodation.createAccommodation.spinner ? (
          <Spinner data-test="createAccommodation-spinner" />
        ) : (
          ''
        )}
        {this.props.stateObject.accommodation.createAccommodation
          .openRoomsModal ? (
            <Modal />
          ) : (
            ''
          )}
        <div className="center-container">
          <div className="page-header">
            <h3>Accommodation Info</h3>
            <hr />
          </div>
          <div className="accommodation-container">
            <div className="inputbox">
              <form
                data-test="createAccommodation-form"
                className="inputbox"
                onSubmit={this.handleSubmit.bind(this)}
              >
                <InputField
                  data-test="name"
                  handleChange={this.props.newAccommodationInput}
                  inputList={createAccommodationList}
                />
                <div className="description">
                  <div>description</div>
                  <textarea
                    data-test="accommodation-description"
                    required
                    onChange={(e) => {
                      this.handleChange(e, 'description');
                    }}
                  />
                </div>
                <div className="city">
                  <div>city</div>
                  <select
                    data-test="accommodation-city"
                    required
                    defaultValue=""
                    onChange={(e) => {
                      this.handleChange(e, 'city');
                    }}
                  >
                    <option value="" disabled>
                      {' '}
                      Select city
                    </option>
                    {retrievedCities
                      && retrievedCities.data.map((city) => (
                        <option key={city.id} value={city.id}>
                          {city.city}
                        </option>
                      ))}
                  </select>
                </div>
                <div className="aligned-container">
                  <div className="upload-btn">
                    <div id="rooms" className="uploaded-rooms">
                      No rooms yet
                    </div>
                    <div>
                      <button
                        data-test="addRooms-btn"
                        type="button"
                        onClick={this.addRooms.bind(this)}
                      >
                        Add rooms
                      </button>
                    </div>
                  </div>
                  <div className="upload-btn">
                    <div id="photos" className="uploaded-photos">
                      No photos yet
                    </div>
                    <div>
                      <button
                        data-test="addPhotos-btn"
                        type="button"
                        onClick={this.uploadWidget.bind(this)}
                      >
                        Upload photos
                      </button>
                    </div>
                  </div>
                  <SubmitButton
                    data-test="send-request-btn"
                    buttonName="Create"
                    className="btn-long"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    );
  }
}
export const mapStateToProps = (state) => ({ stateObject: state });

export default connect(mapStateToProps, {
  updateSpinnerStatus,
  roomsModalAction,
  newAccommodationPhotos,
  newAccommodationInput,
  getCitiesAction,
  createAccommodationAction,
})(CreateAccommodation);
