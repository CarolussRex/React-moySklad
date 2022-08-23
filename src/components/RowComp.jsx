import React, { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

export const RowComp = (props) => {
  const {
    setPrice,
    price,
    name,
    id,
    orderPrice,
    imageUrl,
    category,
    quantity,
  } = props;
  const [amount, setAmount] = useState(0);
  const [visible, setVisible] = useState(false);
  const [show, setShow] = useState(false);

  const elf = "Elf Bar RF350";

  const decrease = () => {
    amount <= 10 ? setAmount(0) : setAmount((prev) => prev - 10);
  };

  const increase = () => {
    if (quantity <= 200) {
      if (quantity > amount) {
        setAmount((prev) => +prev + 10);
        setVisible(true);
      }
    } else {
      setAmount((prev) => +prev + 10);
      setVisible(true);
    }
  };

  useEffect(() => {
    amount !== 0 ? setVisible(true) : setVisible(false);
    amount > 0 ? setPrice(price * amount, id, amount) : setPrice(0, id, 0);
  }, [amount]);

  const validData = (price) => (price / 100).toFixed(2).replace(".", ",");

  return (
    <div>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Body>
          <img
            className="pic-high img-thumbnail img-fluid"
            src={imageUrl}
          ></img>
        </Modal.Body>
      </Modal>
      <div className="row">
        <div className="col-3">
          <div className="cont-img">
            {imageUrl != null ? (
              <img
                onClick={() => setShow(true)}
                className="pic img-thumbnail img-fluid"
                src={imageUrl}
              ></img>
            ) : (
              <img
                className="pic img-thumbnail img-fluid"
                src="https://smokejeen.com/images/companies/1/b-logo/Elf-Bar.jpg"
              ></img>
            )}
          </div>
        </div>
        <div className="col-9 align-self-center">
          <div className="description-cont">
            <div className="description">
              <span>{name}</span>
            </div>
            <div className="artiqle">
              <div className="row">
                <div className="col-4">
                  <div className="price">
                    {category === elf ? (
                      <span>{validData(price)} $/пачка</span>
                    ) : (
                      <span>{validData(price)} $/шт</span>
                    )}
                  </div>
                </div>
                <div className="col-8">
                  <div className="price">
                    {quantity < 200 ? (
                      category === elf ? (
                        <span>{quantity} пачок</span>
                      ) : (
                        <span>{quantity} шт</span>
                      )
                    ) : category === elf ? (
                      <span>200+ пачок</span>
                    ) : (
                      <span>200+ шт</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="row border-bottom align-items-center">
        <div className="col-6">
          <div
            className="full-price"
            style={{ display: visible ? "flex" : "none" }}
          >
            <span>Загальна сума: {validData(orderPrice)} $</span>
          </div>
        </div>
        <div className="col-6">
          <form className="d-flex float-end forms">
            <span className="input-group-prepend">
              <button
                type="button"
                className="btn btn-outline-danger m-1 round-mn"
                style={{ display: visible ? "flex" : "none" }}
                data-type="minus"
                data-field="quant[1]"
                onClick={decrease}
              >
                <span className="fa fa-minus">-</span>
              </button>
            </span>
            <input
              type="number"
              className="w-100 text-center m-1 form-control inp"
              max={quantity}
              style={{ display: visible ? "flex" : "none" }}
              value={amount}
              onChange={(e) =>
                quantity <= 200
                  ? e.target.value <= quantity &&
                    e.target.value >= 0 &&
                    setAmount(e.target.value)
                  : e.target.value >= 0 && setAmount(e.target.value)
              }
              onBlur={(e) =>
                e.target.value === ""
                  ? setAmount(0)
                  : e.target.value % 10 !== 0 &&
                    setAmount(+e.target.value + (10 - (e.target.value % 10)))
              }
            />
            <span className="input-group-append">
              <button
                type="button"
                className="btn btn-outline-primary m-1 float-right round-pl mb-3"
                data-type="plus"
                data-field="quant[1]"
                onClick={increase}
              >
                <span className="fa fa-plus">+</span>
              </button>
            </span>
          </form>
        </div>
      </div>
    </div>
  );
};
