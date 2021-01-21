import "./WarehouseDetail.scss";
import goBack from "../../assets/icons/arrow_back-24px.svg";
import edit from "../../assets/icons/edit-24px.svg";
import WarehouseInventory from "../../components/WarehouseInventory/WarehouseInventory";
import { Link } from "react-router-dom";

function WarehouseDetail({ warehouse }) {
  return (
    <div>
      <section className="warehouse-detail">
        <div className="warehouse-detail__header">
          <Link to="/">
            <img
              className="warehouse-detail__goback"
              src={goBack}
              alt="go back arrow"
            />
          </Link>
          <h1 className="warehouse-detail__title">
            {warehouse.warehouse.name}
          </h1>

          <div className="warehouse-detail__edit">
            <Link to={`/warehouse/${warehouse.warehouse.id}/edit`}>
              <img
                className="warehouse-detail__edit-icon"
                src={edit}
                alt="edit"
              />
              <h5 className="warehouse-detail__edit-txt">Edit</h5>
            </Link>
          </div>
        </div>
        <div className="warehouse-details">
          <div className="warehouse-details__left">
            <h4 className="warehouse-details__header">WAREHOUSE ADDRESS:</h4>
            <p className="warehouse-details__txt">
              {warehouse.warehouse.address}
            </p>
            <p className="warehouse-details__txt">
              {warehouse.warehouse.city}, {warehouse.warehouse.country}
            </p>
          </div>
          <div className="warehouse-details__info">
            <div className="warehouse-details__left">
              <h4 className="warehouse-details__header">CONTACT NAME:</h4>
              <p className="warehouse-details__txt">
                {warehouse.warehouse.contact.name}
              </p>
              <p className="warehouse-details__txt">
                {warehouse.warehouse.contact.position}
              </p>
            </div>
            <div className="warehouse-details__info-right">
              <h4 className="warehouse-details__header">
                CONTACT INFORMATION:
              </h4>
              <p className="warehouse-details__txt">
                {warehouse.warehouse.contact.phone}
              </p>
              <p className="warehouse-details__txt">
                {warehouse.warehouse.contact.email}
              </p>
            </div>
          </div>
        </div>
        <WarehouseInventory warehouse={warehouse} />
      </section>
      <p className="warehouse-details__footer">
        © InStock Inc. All Rights Reserved.
      </p>
    </div>
  );
}

export default WarehouseDetail;
