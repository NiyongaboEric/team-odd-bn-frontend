import React, { Component } from 'react'
import { connect } from 'react-redux'
import DashBoard from '../Dashboard/sidebar/index'
import '../../assets/css/oneway.scss'
import Submit from '../../components/SubmitButton'
import '../../assets/css/base.scss'
import TripType from '../../components/trips/TripTypes'
import TripHeader from '../../components/trips/TripHeader'
import { storeInputsAction, onewayAction, updateSpinnerStatus } from '../../redux/actions/tripsActions/onewayActions'

class OnewayTrip extends Component {
  constructor(props) {
    super(props);
    this.handleClick;
  }

  handleChange = data => {
    this.setState({
      ...data, data
    })
  }
  checkCurrentDate = () => {    
     let currentDate = new Date();      
      return JSON.stringify(currentDate).slice(1,11)
    } 

  render() {
   
    const { tripState } = this.props
    const data = tripState.trips.tripRequests.getCity;

    return (
      <DashBoard>
        <div className="oneway-container">
          <TripHeader />
          <div className="trip-field-container">
            <TripType />
            <div className="trip-form">
              <form
              onSubmit={(e) => {   
                e.preventDefault();
                this.props.onewayAction(this.props.tripState.trips.tripRequests.onewayInput)
                this.props.updateSpinnerStatus(true);
              }}
              >
                <div className="cityField">
                  <div className="cityLabel">
                    <label htmlFor="input">City</label>
                  </div>

                  <div className="originCity">
                    <select
                      onChange={e =>
                        this.props.storeInputsAction({ originId: e.target.value })
                      }
                      defaultValue=""
                      required
                    >
                      <option value="" disabled>
                        Your Origin
                      </option>

                      {data &&
                        data.map((cities, index) => (
                          <option name="originId" value={cities.id} key={index}>
                            {cities.city}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div className="destinationCity">
                    <select
                      onChange={e =>
                        this.props.storeInputsAction({ destinationId: e.target.value })
                      }
                       defaultValue=""
                       required
                    >
                      <option value="" disabled >
                        Your Destination
                      </option>
                      {
                      
                      data &&
                        data.map((cities, index) => (
                          <option value={cities.id} name="destinationId" key={index}>
                            {cities.city}
                          </option>
                        ))}
                    </select>
                  </div>
                </div>

                <div className="reasonField">
                  <label htmlFor="textArea">Reason</label>
                  <textarea
                    required
                    name="reason"
                    id="textArea"
                    cols="30"
                    rows="10"
                    placeholder="Reason for the trip"
                    onChange={e =>
                      this.props.storeInputsAction({ reason: e.target.value })
                    }
                  />
                </div>

                <div className="dateField">
                  <div>
                    <label htmlFor="startDate">Start date</label>
                    <input
                      type="date"
                      required
                      name="startDate"
                      id="startDate"
                      min={this.checkCurrentDate()}
                      onChange={e =>
                        this.props.storeInputsAction({ startDate: e.target.value })
                      }
                    />
                  </div>
                </div>

                <div className="btnField">
                  <Submit buttonName="Request trip" className="btn-submit" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </DashBoard>
    )
  }
}

const mapStateToProps = state => ({
  tripState: state,
})
const mapDispatchToProps = {
  storeInputsAction,
  onewayAction,
  updateSpinnerStatus,
}

export default connect(mapStateToProps, mapDispatchToProps)(OnewayTrip)
