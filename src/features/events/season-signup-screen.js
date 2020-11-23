import { Button, TooltipButton } from "components/buttons"
import { FaMinusCircle, FaPlusCircle } from "react-icons/fa"
import * as colors from "styles/colors"

function SeasonSignupScreen() {
  return (
    <div className="content__inner">
      <header className="content__title">
        <h1>2021 Season Registration</h1>
      </header>
      <div className="row">
        <div className="col-lg-6">
          <div className="card">
            <div className="card-body">
              <h4 className="card-title">Membership Policies</h4>
              <h6 className="card-subtitle">
                Registration open: Sunday, January 6th to Friday, June 3rd
              </h6>
              <div className="card-text">
                <div>markdown text with policy details</div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="card border border-success">
            <div className="card-header text-white bg-success">Online Registration Form</div>
            <div className="card-body">
              <div className="row" style={{ minHeight: "32px" }}>
                <div className="col-md-4 col-12 my-auto">
                  <strong>Stuart Finley</strong>
                </div>
                <div className="col-md-1 col-2 my-auto">
                  <TooltipButton
                    label="Remove from registration"
                    highlight={colors.gray300}
                    disabled={true}
                    onClick={() => {}}
                    icon={<FaMinusCircle />}
                  />
                </div>
                <div className="col-md-5 col-7 my-auto">Returning Member Dues</div>
                <div className="col-md-2 col-3 my-auto" style={{ textAlign: "right" }}>
                  $90.00
                </div>
              </div>
              <div className="row" style={{ minHeight: "32px" }}>
                <div className="col-md-4 hidden-sm-down my-auto"></div>
                <div className="col-md-1 col-2 my-auto">
                  <TooltipButton
                    label="Add to registration"
                    highlight={colors.success}
                    onClick={() => {}}
                    icon={<FaPlusCircle />}
                  />
                </div>
                <div className="col-md-5 col-7 my-auto">Patron Card ($55)</div>
                <div className="col-md-2 col-3 my-auto" style={{ textAlign: "right" }}>
                  $0.00
                </div>
              </div>
              <div className="row" style={{ minHeight: "32px" }}>
                <div className="col-md-4 hidden-sm-down my-auto"></div>
                <div className="col-md-1 col-2 my-auto"></div>
                <div className="col-md-5 col-7 my-auto">Transaction (30¢ + 2.9%)</div>
                <div className="col-md-2 col-3 my-auto" style={{ textAlign: "right" }}>
                  $7.50
                </div>
              </div>
              <div className="row" style={{ minHeight: "32px" }}>
                <div className="col-md-4 hidden-sm-down my-auto"></div>
                <div className="col-md-1 col-2 my-auto"></div>
                <div className="col-md-5 col-7 my-auto">Amount Due</div>
                <div
                  className="col-md-2 col-3 my-auto"
                  style={{ textAlign: "right", borderTop: `solid 2px ${colors.gray500}` }}
                >
                  <strong>$97.50</strong>
                </div>
              </div>
              <hr />
              <div className="row" style={{ minHeight: "32px" }}>
                <div className="col-8 my-auto">Select competition tees:</div>
                <div className="col-4 my-auto" style={{ textAlign: "right" }}>
                  <select>
                    <option>Club</option>
                    <option>Gold</option>
                  </select>
                </div>
              </div>
              <hr />
              <div className="row">
                <div className="col-12">
                  <label>Notes / Special Requests</label>
                  <textarea className="form-control fc-alt" rows="3" name="notes"></textarea>
                </div>
              </div>
              <div className="row" style={{ marginTop: "1rem", textAlign: "right" }}>
                <div className="col-12">
                  <Button>Looks Good!</Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeasonSignupScreen
