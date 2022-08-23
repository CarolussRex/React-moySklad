import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { RowDesktopComp } from "./RowDesktopComp";
import { RowComp } from "./RowComp";
import { NavMenu } from "./NavMenu";
import "./main.css";

export const ItemComp = () => {
  const [data, setData] = useState([]);
  const [fullprice, setFullprice] = useState([]);
  const [fullAmount, setFullAmount] = useState([]);
  const [fullVisible, setFullVisible] = useState(false);
  const [userName, setUsername] = useState("");
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    const FetchData = async () => {
      const header = {
        method: "GET",
      };
      fetch(`/product?userid=${id}`, header)
        .then((response) =>
          response.json().then(({ username, rows }) => {
            rows.forEach(
              ({ name, userPrice, id, categoryName, imageUrl, quantity }) => {
                const newObj = {
                  name,
                  price: userPrice,
                  orderPrice: 0,
                  amount: 0,
                  id,
                  category: categoryName,
                  imageUrl,
                  quantity,
                };
                setUsername(username);
                setData((prev) => [...prev, newObj]);
                setLoading(true);
              }
            );
          })
        )
        .catch((e) => console.error(e));
    };
    FetchData();
  }, []);

  useEffect(() => {
    setFullVisible(!!fullAmount);
  }, [fullAmount]);

  useEffect(() => {
    data.forEach(({ amount }) => {
      if (amount >= 0) {
        setFull();
      }
    });
  }, [data]);

  const setPrice = (newPrice, id, amount) => {
    const mappedData = data.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          orderPrice: newPrice,
          amount,
        };
      }
      return item;
    });
    setData(mappedData);
  };

  const setFull = () => {
    const newArr = data.map(({ orderPrice }) => orderPrice);

    const newPrice = newArr.reduce(
      (previousScore, currentScore) => previousScore + currentScore
    );
    setFullprice(newPrice);

    const newArr2 = data.map(({ amount }) => amount);

    const newAmount = newArr2.reduce(
      (previousScore, currentScore) => +previousScore + +currentScore
    );
    setFullAmount(newAmount);
  };

  const validData = (price) => (price / 100).toFixed(2).replace(".", ",");

  return loading ? (
    window.innerWidth > 576 ? (
      <div>
        <NavMenu userName={userName} />
        <div
          className="w-100 desc-conc"
          id="conclusion"
          style={{ display: fullVisible ? "flex" : "none" }}
        >
          <div className="container d-flex">
            <div className="col-8">
              <div className="grey d-flex align-self-center grey as">
                <div className="full-res">
                  <span>Загальна сума: {validData(fullprice)} $</span>
                </div>
                <div className="full-res">
                  <span>Загальна кількість: {fullAmount}</span>
                </div>
              </div>
            </div>
            <div className="col-4 grey d-flex justify-content-center">
              <button type="button" className="btn btn-success ord">
                <Link
                  className="SectionNavigation-Item Section"
                  to={"/order"}
                  state={{ data, fullprice, fullAmount, userName, id }}
                >
                  Замовити
                </Link>
              </button>
            </div>
          </div>
        </div>
        <div className="container">
          <table className="table  table-bordered align-middle">
            <thead className="thead-dark">
              <tr className="text-center">
                <th scope="col">Фото</th>
                <th scope="col">Назва</th>
                <th scope="col">Ціна</th>
                <th scope="col">Наявність</th>
                <th scope="col">Кількість</th>
                <th scope="col" className="w-9">
                  Сума
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map(
                (
                  { id, name, orderPrice, price, category, imageUrl, quantity },
                  count,
                  arr
                ) => {
                  const prev = arr[count - 1];
                  return (count > 0 && category !== prev.category) ||
                    count === 0 ? (
                    <React.Fragment key={id}>
                      <tr>
                        <div className="spec d-flex w-100">
                          <span>{category}</span>
                        </div>
                      </tr>
                      <RowDesktopComp
                        key={id}
                        category={category}
                        quantity={quantity}
                        name={name}
                        imageUrl={imageUrl}
                        orderPrice={orderPrice}
                        id={id}
                        price={price}
                        setPrice={setPrice}
                      >
                        {" "}
                      </RowDesktopComp>
                    </React.Fragment>
                  ) : (
                    <RowDesktopComp
                      key={id}
                      category={category}
                      quantity={quantity}
                      name={name}
                      imageUrl={imageUrl}
                      orderPrice={orderPrice}
                      id={id}
                      price={price}
                      setPrice={setPrice}
                    >
                      {" "}
                    </RowDesktopComp>
                  );
                }
              )}
              <tr
                className="space"
                style={{ display: fullVisible ? "flex" : "none" }}
              ></tr>
            </tbody>
          </table>
        </div>
      </div>
    ) : (
      <div>
        <NavMenu userName={userName} />
        <div className="container">
          <div
            className="row w-100"
            id="conclusion"
            style={{ display: fullVisible ? "flex" : "none" }}
          >
            <div className="col-8 align-self-center">
              <div className="full-res">
                <span>Загальна сума: {validData(fullprice)} $</span>
              </div>
              <div className="full-res">
                <span>Загальна кількість: {fullAmount}</span>
              </div>
            </div>
            <div className="col-4">
              <button type="button" className="btn btn-success ord">
                <Link
                  className="SectionNavigation-Item Section"
                  to={"/order"}
                  state={{ data, fullprice, fullAmount, userName, id }}
                >
                  Замовити
                </Link>
              </button>
            </div>
          </div>
          {data.map(
            (
              { id, name, orderPrice, price, category, imageUrl, quantity },
              count,
              arr
            ) => {
              const prev = arr[count - 1];
              return (count > 0 && category !== prev.category) ||
                count === 0 ? (
                <React.Fragment key={id}>
                  <div className="row">
                    <div className="col-12">
                      <div className="spec">
                        <span>{category}</span>
                      </div>
                    </div>
                  </div>
                  <RowComp
                    key={id}
                    name={name}
                    quantity={quantity}
                    category={category}
                    imageUrl={imageUrl}
                    orderPrice={orderPrice}
                    id={id}
                    price={price}
                    setPrice={setPrice}
                  >
                    {" "}
                  </RowComp>
                </React.Fragment>
              ) : (
                <RowComp
                  key={id}
                  name={name}
                  quantity={quantity}
                  category={category}
                  imageUrl={imageUrl}
                  orderPrice={orderPrice}
                  id={id}
                  price={price}
                  setPrice={setPrice}
                >
                  {" "}
                </RowComp>
              );
            }
          )}
          <div
            className="space"
            style={{ display: fullVisible ? "flex" : "none" }}
          ></div>
        </div>
      </div>
    )
  ) : (
    <div className="loader"></div>
  );
};
