import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Select from "react-select";
import { NavMenu } from "./NavMenu";

export const Order = () => {
  const { state } = useLocation();
  const { fullprice, fullAmount, data, userName, id } = state;
  const [formatedData, setFormatedData] = useState([]);
  const [dataForRes, setDataForRes] = useState([]);
  const [text, setText] = useState("");
  const [succed, setSucced] = useState(false);
  const [exception, setException] = useState(false);
  const [city, setCity] = useState([]);
  const [ref, setRef] = useState("");
  const [warehouses, setWarehouses] = useState([]);
  const [address, setAddress] = useState("");
  const [post, setPost] = useState("");
  const [currPost, setCurrPost] = useState("");
  const [num, setNum] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    const res = data.filter(({ amount }) => amount > 0);
    setDataForRes(res);
    dataForRes.map(({ id, price, amount }) => {
      const obj = {
        orderQuantity: amount,
        userPrice: price,
        id: id,
      };
      setFormatedData((prev) => [...prev, obj]);
    });
  }, []);

  const sendData = (e) => {
    e.preventDefault();
    const header = {
      method: "POST",
      mode: "cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        userId: id,
        order: formatedData,
        description: text,
        name,
        address,
        post,
        num: num
          .split(/[-+()]+/)
          .slice(2)
          .join(""),
        price,
      }),
    };
    fetch(`/product`, header).then((response) => {
      response.json();
      if (response.ok) setSucced(true);
      else setException(true);
    });
  };

  const findCity = (loc) => {
    const place = {
      method: "POST",
      body: JSON.stringify({
        apiKey: "....",
        modelName: "Address",
        calledMethod: "searchSettlements",
        methodProperties: {
          CityName: loc,
          Limit: "50",
          Page: "1",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("https://api.novaposhta.ua/v2.0/json/", place)
      .then((response) => response.json())
      .then(({ data }) => {
        setCity([]);
        data[0].Addresses.map(({ Present, Ref }) => {
          const obj = {
            value: Ref,
            label: Present,
          };
          setCity((prev) => [...prev, obj]);
        });
      });
  };

  useEffect(() => {
    const warehouse = {
      method: "POST",
      body: JSON.stringify({
        apiKey: "....",
        modelName: "Address",
        calledMethod: "getWarehouses",
        methodProperties: {
          SettlementRef: ref,
          FindByString: currPost,
          Limit: "50",
          Page: "0",
          Language: "UA",
        },
      }),
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch("https://api.novaposhta.ua/v2.0/json/", warehouse)
      .then((response) => response.json())
      .then(({ data }) => {
        setWarehouses([]);
        data.map(({ Description, Number }) => {
          const obj = {
            value: Number,
            label: Description,
          };
          setWarehouses((prev) => [...prev, obj]);
        });
      });
  }, [currPost, ref]);

  const isNull = (data) => {
    if (data) {
      setAddress(data.label);
      setRef(data.value);
    } else {
      setRef("-");
      setAddress("");
      setWarehouses([]);
      setPost("");
    }
  };

  const handleInputChange = (inputValue) => {
    setCurrPost(inputValue);
  };

  const numCheck = (e) => {
    if (e.target.name === "phone" && e.target.value === "") {
      e.target.value = "+380";
    }
  };

  const formatPhoneNum = (value) => {
    if (!value) return value;
    const phoneNumber = value.replace(/[^\d]/g, "");
    const phoneNumberLength = phoneNumber.length;
    if (phoneNumberLength < 3) return `+${phoneNumber}`;
    if (phoneNumberLength < 6) return `+${phoneNumber}`;
    if (phoneNumberLength < 9) {
      return `+${phoneNumber.slice(0, 2)}(${phoneNumber.slice(
        2,
        5
      )})${phoneNumber.slice(5, 8)}`;
    }
    return `+${phoneNumber.slice(0, 2)}(${phoneNumber.slice(
      2,
      5
    )})${phoneNumber.slice(5, 8)}-${phoneNumber.slice(8, 12)}`;
  };

  const changeNum = (e) => {
    const formatedPhoneNum = formatPhoneNum(e.target.value);
    setNum(formatedPhoneNum);
  };

  const validData = (price) => (price / 100).toFixed(2).replace(".", ",");

  return (
    <div>
      {exception === true && (
        <Navigate
          to={"/response"}
          state={{
            title: "Exception!",
            desc: ", вибачайте,  трапилась помилка",
            userName,
          }}
        />
      )}
      {succed === true && (
        <Navigate
          to={"/response"}
          state={{ title: "", desc: ", ваш заказ було надіслано", userName }}
        />
      )}

      <NavMenu userName={userName} />
      <div className="container">
        <table className="table  table-bordered ">
          <thead className="thead-dark align-middle">
            <tr className="text-center">
              <th scope="col">Назва</th>
              <th scope="col">Ціна</th>
              <th scope="col">Кількість</th>
              <th scope="col">Сума</th>
            </tr>
          </thead>
          <tbody>
            {dataForRes.map(({ name, orderPrice, price, amount }, id) => (
              <tr key={id} className="text-center">
                <td>{name}</td>
                <th scope="row">{validData(price)}&nbsp;$</th>
                <td>{amount}</td>
                <td>{validData(orderPrice)}&nbsp;$</td>
              </tr>
            ))}
          </tbody>
          </table>
          <div className='order-cont mb-5'>
            <div className="row">
              <div className="col-6">
                <label htmlFor="Text1" className='d-flex justify-content-center mb-2'>Коментар</label>
                <textarea className="form-control" id="Text1" rows="4" value={text} onChange={((e) => setText(e.target.value))}/>
              </div>
              <div className="col-6 align-self-center">
                <div className='full-res ord'>
                  <span className='order-table'>Загальна сума: {validData(fullprice)}&nbsp;$</span>
                </div>
                <div className='full-res ord'>
                  <span className='order-table'>Загальна кількість: {fullAmount}</span>
                </div>
                </div>
              </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-11 col-md-6">
                <form onSubmit={(e) => sendData(e)}>
              <span>У випадку, якщо ващі замовлення прямують на різних отримувачей у різні місця, велике прохання, вести усю необхідну інформацію.</span>
              <input className='form-control mt-4' placeholder="Прізвище Ім'я По Батькові" pattern="^[А-ЩЬЮЯҐЄІЇа-щьюяґєії\s]+$" value={name} onChange={(e) => setName(e.target.value)}/>
              <p>Треба вказати Прізвище Ім'я По Батькові саме в такій послідовності і обов'язково українською мовою</p>
              <input className='form-control mt-4' placeholder='Номер' name='phone' pattern="^\+\d{2}\(\d{3}\)\d{3}-\d{4}$" value={num} onChange={(e) => changeNum(e)} onFocus = {(e) => numCheck(e)}/>
                  <Select 
                    options={city}
                    isClearable
                    placeholder="Місто"
                    onInputChange={findCity}
                    onChange={isNull}
                    noOptionsMessage={() => "Назва міста"}
                  />
             
                  <Select 
                    options={warehouses}
                    isClearable
                    placeholder="Відділення НП"
                    value={post.length > 0 ? {label: post} : ""}
                    onChange={data => setPost(data ? data.label : "")}
                    onInputChange={handleInputChange}
                    noOptionsMessage={() => "Назва відділення"}
                  />
                  <input className='form-control mt-4' placeholder='Оціночна вартість' pattern="^[ 0-9]+$" value={price} onChange={(e) => setPrice(e.target.value)}/>
                  <button className="btn btn-primary btn-lg mt-4 mb-5">Замовити</button>
                </form>
                </div>
              </div>
            </div>
          </div>
  ) 
}
