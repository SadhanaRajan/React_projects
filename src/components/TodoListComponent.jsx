import React from 'react'

const TodoItem = ( props ) => {
  return (
    <li onClick={ props.onClick }>
      <input
        type='checkbox'
        checked={ props.item.done }
        onChange={ props.onClick } />
      { props.item.text }
    </li>
  );
}

class TodoList extends React.Component {
  render() {
    const { items, onListClick } = this.props;
    return (<ul onClick={onListClick}>
      {items.map((item, index) => 
        <TodoItem item={ item } key={ index } onClick={ ( event ) => {
          // debugger
          if ( item.done ) {
            event.stopPropagation();
          } else {
            console.log( item.text );
            this.props.onItemClick( item, event );
          }
        } } /> ) }
    </ul>);
  }
  
  handleItemClick ( item, event ) {
    console.log( item.text, item.done );
    // Write your code here
    if ( item.done ) {
      event.stopImmediatePropagation();
    } else {
      console.log( item.text );
      this.props.onItemClick( item, event );
    }
  }
}


const items = [ { text: 'Buy grocery', done: true },
  { text: 'Play guitar', done: false },
  { text: 'Romantic dinner', done: false }
];

const TodoListComponent = () => <TodoList
  items={items}
  onListClick={(event) => console.log("List clicked!")}
  onItemClick={(item, event) => { console.log(item, event) }}
/>;


export default TodoListComponent;