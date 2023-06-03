import React, { useState } from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import Form from 'react-bootstrap/Form';
import {VscListFilter} from 'react-icons/vsc'
import {MdKeyboardArrowDown} from 'react-icons/md'

const FilterIngredients = () => {
  const [value, setValue] = useState('');

  const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
    <div className='filtercontainer'>
    <button className='filterbutton'
      type='button'
      href=""
      ref={ref}
      onClick={(e) => {
        e.preventDefault();
        onClick(e);
      }}
    >
      {children } <MdKeyboardArrowDown/><VscListFilter />

    </button>
    </div>
  ));

  const CustomMenu = React.forwardRef(
    ({ children, style, className, 'aria-labelledby': labeledBy }, ref) => {
      return (
        <div 
          ref={ref}
          style={{ ...style, maxHeight: '200px', overflowY: 'auto' }} 
          className={className}
          aria-labelledby={labeledBy}
        >
        
          <Form.Control
            autoFocus
            className="mx-3 my-2 w-auto"
            placeholder="Type to filter..."
            onChange={(e) => setValue(e.target.value)}
            value={value}
          />
         
          <ul className="list-unstyled">
            {React.Children.toArray(children).filter(
              (child) =>
                !value || child.props.children.toLowerCase().startsWith(value),
            )}
          </ul>
        </div>
      );
    },
  );

  return (
    <Dropdown>
      <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
        Filter ingredients
      </Dropdown.Toggle>

      <Dropdown.Menu as={CustomMenu}>

    <Dropdown.Item eventKey="2">Apples</Dropdown.Item>
    <Dropdown.Item eventKey="3">Avocado</Dropdown.Item>
    <Dropdown.Item eventKey="4">Bacon</Dropdown.Item>
    <Dropdown.Item eventKey="5">Bananas</Dropdown.Item>
    <Dropdown.Item eventKey="6">Beef</Dropdown.Item>
    <Dropdown.Item eventKey="7">Black beans</Dropdown.Item>
    <Dropdown.Item eventKey="8">Bread</Dropdown.Item>
    <Dropdown.Item eventKey="9">Broccoli</Dropdown.Item>
    <Dropdown.Item eventKey="10">Butter</Dropdown.Item>
    <Dropdown.Item eventKey="11">Cabbage</Dropdown.Item>
    <Dropdown.Item eventKey="12">Carrots</Dropdown.Item>
    <Dropdown.Item eventKey="13">Celery</Dropdown.Item>
    <Dropdown.Item eventKey="14">Cheese</Dropdown.Item>
    <Dropdown.Item eventKey="15">Chicken</Dropdown.Item>
    <Dropdown.Item eventKey="16">Chickpeas</Dropdown.Item>
    <Dropdown.Item eventKey="17">Chocolate</Dropdown.Item>
    <Dropdown.Item eventKey="18">Coconut milk</Dropdown.Item>
    <Dropdown.Item eventKey="19">Coffee</Dropdown.Item>
    <Dropdown.Item eventKey="20">Corn</Dropdown.Item>
    <Dropdown.Item eventKey="21">Cucumber</Dropdown.Item>
    <Dropdown.Item eventKey="22">Eggplant</Dropdown.Item>
    <Dropdown.Item eventKey="23">Eggs</Dropdown.Item>
    <Dropdown.Item eventKey="24">Feta cheese</Dropdown.Item>
    <Dropdown.Item eventKey="25">Fish</Dropdown.Item>
    <Dropdown.Item eventKey="26">Garlic</Dropdown.Item>
    <Dropdown.Item eventKey="27">Ginger</Dropdown.Item>
    <Dropdown.Item eventKey="28">Goat cheese</Dropdown.Item>
    <Dropdown.Item eventKey="29">Green beans</Dropdown.Item>
    <Dropdown.Item eventKey="30">Ground beef</Dropdown.Item>
    <Dropdown.Item eventKey="31">Honey</Dropdown.Item>
    <Dropdown.Item eventKey="32">Kale</Dropdown.Item>
    <Dropdown.Item eventKey="33">Lamb</Dropdown.Item>
    <Dropdown.Item eventKey="34">Lemon</Dropdown.Item>
    <Dropdown.Item eventKey="35">Lentils</Dropdown.Item>
    <Dropdown.Item eventKey="36">Lettuce</Dropdown.Item>
    <Dropdown.Item eventKey="37">Mango</Dropdown.Item>
    <Dropdown.Item eventKey="38">Mushrooms</Dropdown.Item>
    <Dropdown.Item eventKey="39">Mustard</Dropdown.Item>
    <Dropdown.Item eventKey="40">Noodles</Dropdown.Item>
    <Dropdown.Item eventKey="41">Olive oil</Dropdown.Item>
    <Dropdown.Item eventKey="42">Onions</Dropdown.Item>
    <Dropdown.Item eventKey="43">Oranges</Dropdown.Item>
    <Dropdown.Item eventKey="44">Oregano</Dropdown.Item>
    <Dropdown.Item eventKey="45">Paprika</Dropdown.Item>
    <Dropdown.Item eventKey="46">Flour</Dropdown.Item>
    <Dropdown.Item eventKey="47">Sugar</Dropdown.Item>
    <Dropdown.Item eventKey="48">Milk</Dropdown.Item>
    <Dropdown.Item eventKey="49">Almonds</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default FilterIngredients;