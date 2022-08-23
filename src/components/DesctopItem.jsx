import React, { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal';

export const DesctopItem = props => {
    const elf = "Elf Bar RF350"
    const {setPrice, price, name, id, orderPrice, imageUrl, category, quantity} = props
    const [amount, setAmount] = useState(0)
    const [show, setShow] = useState(false);

    useEffect(() => {
      (amount > 0)  ? setPrice(price * amount, id, amount)  : setPrice(0, id, 0)
    }, [amount]);

    const DeCrease = () => {
      (amount <= 10) ? setAmount(0) : setAmount((prev) => prev - 10)
    };

    const InCrease = () => {
      if(quantity > amount)
        setAmount((prev) => +prev + 10)
    }

    const validData = (price) => (price/100).toFixed(2).replace(".", ",")

  return (
  <tr>
    <Modal
        show={show}
        onHide={(() => setShow(false))}
      >
        <Modal.Body>
          <img className="pic-high img-thumbnail img-fluid" src={imageUrl}></img>
        </Modal.Body>
      </Modal>
    <th scope="row">
        <div className="d-flex justify-content-center">
            <div className='cont-img desc'>
                {(imageUrl != null) ? <img onClick={(() => setShow(true))} className="pic img-thumbnail img-fluid" src={imageUrl}></img>: <img className="pic img-thumbnail img-fluid" src="https://smokejeen.com/images/companies/1/b-logo/Elf-Bar.jpg"></img>}
            </div>
        </div>
    </th>
  <td>
    <div className='description-cont text-center'>
        <div className='description'>
            <span>{name}</span>
        </div>
    </div>  
  </td>
  <td>
  <div className='price text-center'>
    {(category === elf) ? <span>{validData(price)} $/пачка</span> : <span>{validData(price)} $/шт</span>} 
  </div>
  </td>
    <td>
      <div className='price text-center'>
        {quantity < 200 ? ((category === elf)? <span>{quantity} пачок</span> : <span>{quantity} шт</span>) : (category === elf)? <span>200+ пачок</span>: <span>200+ шт</span>}
      </div>
    </td>
    <td>
        <div className="d-flex justify-content-center">
    <form className = "d-flex float-start">
  <span className="input-group-prepend">
      <button type="button" className="btn btn-outline-danger m-1 round-pl"  data-type="minus" data-field="quant[1]" onClick={DeCrease}>
             <span className="fa fa-minus">-</span>
           </button>
        </span>
         <input type="number" className='w-100 text-center m-1 form-control' max={quantity} step={10} value={amount} onChange={((e) => (quantity <= 200) ? ((e.target.value <= quantity) && (e.target.value >= 0 && setAmount(e.target.value))) : (e.target.value >= 0 && setAmount(e.target.value)))} onBlur={((e) => (e.target.value === "" ? setAmount(0): (e.target.value % 10 !== 0) && setAmount(+ e.target.value + (10 - (e.target.value % 10)))))}/>
       <span className="input-group-append">
           <button type="button" className="btn btn-outline-primary m-1 float-left round-pl" data-type="plus" data-field="quant[1]" onClick={InCrease}>
               <span className="fa fa-plus">+</span>
            </button>
         </span>
       </form>
       </div>
        </td>
        <td>
        <div className='price text-center'>
            <span>{validData(orderPrice)} $</span>
        </div>
    </td>
  </tr>
  )
}
