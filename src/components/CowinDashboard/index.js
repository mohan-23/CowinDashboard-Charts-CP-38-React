import {Component} from 'react'
import Loader from 'react-loader-spinner'

import VaccinationCoverage from '../VaccinationCoverage'
import VaccinationByGender from '../VaccinationByGender'
import VaccinationByAge from '../VaccinationByAge'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class CowinDashboard extends Component {
  state = {
    status: apiStatus.initial,
    byDays: [],
    byAge: [],
    byGender: [],
  }

  componentDidMount() {
    this.getVaccinationDetails()
  }

  getVaccinationDetails = async () => {
    this.setState({status: apiStatus.inProgress})

    const url = 'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(url)
    console.log(response)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const daysVaccination = data.last_7_days_vaccination.map(eachDay => ({
        dose1: eachDay.dose_1,
        dose2: eachDay.dose_2,
        vaccineDate: eachDay.vaccine_date,
      }))

      const ageVaccination = data.vaccination_by_age.map(eachAge => ({
        age: eachAge.age,
        count: eachAge.count,
      }))

      const genderVaccination = data.vaccination_by_gender.map(eachGender => ({
        count: eachGender.count,
        gender: eachGender.gender,
      }))
      this.setState({
        byDays: daysVaccination,
        byAge: ageVaccination,
        byGender: genderVaccination,
        status: apiStatus.success,
      })
    } else {
      this.setState({status: apiStatus.failure})
    }
  }

  renderSuccessView = () => {
    const {byAge, byDays, byGender} = this.state

    return (
      <>
        <VaccinationCoverage vaccinationByDate={byDays} />
        <VaccinationByGender vaccinationByGender={byGender} />
        <VaccinationByAge vaccinationByAge={byAge} />
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-container">
      <div className="failure-cart">
        <img
          src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
          className="failure-logo"
          alt="failure view"
        />
        <h1 className="failure-heading">Something went wrong</h1>
      </div>
    </div>
  )

  renderInProgressView = () => (
    <div data-testid="loader" className="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderView = () => {
    const {status} = this.state

    switch (status) {
      case apiStatus.success:
        return this.renderSuccessView()
      case apiStatus.failure:
        return this.renderFailureView()
      case apiStatus.inProgress:
        return this.renderInProgressView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-cart">
        <div className="logo-cart">
          <img
            src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
            className="website-logo"
            alt="website logo"
          />
          <h1 className="co-win-heading">Co-WIN</h1>
        </div>
        <h1 className="para">CoWIN Vaccination in India</h1>
        {this.renderView()}
      </div>
    )
  }
}

export default CowinDashboard
