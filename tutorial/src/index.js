import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

/**
实际上，React 支持一种简单的语法，称为 函数式组件 ，这是从组件类型方面归类的，
例如我们示例中的 Square(方格) 组件，它只包含一个 render 方法。
而不是通过扩展 React.Component 类定义的，函数式组件只需编写一个函数，传入 props(属性) 并返回应该渲染的内容就可以了。

您需要将 this.props 都更改为 props。应用程序中的许多组件可以被改写为函数式组件：这些组件往往易于编写，而且 React 将来会更加优化它们。

当我们清理代码时，我们还要将 onClick={() => props.onClick()} 更改为 onClick={props.onClick} ，因为在我们的例子中传递函数就足够了。 请注意 onClick={props.onClick()} 将无法正常工作，因为它会立即调用 props.onClick ，而不是将其传递过去。
 */
function Square(props) {
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    );
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([
        {
          squares: squares
        }
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? 'Go to move #' + move : 'Go to game start';
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board squares={current.squares} onClick={i => this.handleClick(i)} />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(<Game />, document.getElementById('root'));

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

/**
        不可变数据的重要性（Why Immutability Is Important）
        在前面的代码示例中，我们建议在数组进行更改之前使用 .slice() 运算符来复制 squares 数组，并防止现有数组的变异。我们来说说这是什么意思，为什么这是一个重要的学习概念。

        通常有两种方式来更改数据。第一种方法是通过直接更改变量的值来改变数据。第二种方法是用包含所需更改对象的新副本来替换数据。

        通过赋值改变数据（Data change with mutation）
        var player = {score: 1, name: 'Jeff'};
        player.score = 2;
        // 现在 player 是 {score: 2, name: 'Jeff'}
        不通过赋值改变数据（Data change without mutation）
        var player = {score: 1, name: 'Jeff'};

        var newPlayer = Object.assign({}, player, {score: 2});
        // 现在 player 没改变, 但是 newPlayer 是 {score: 2, name: 'Jeff'}

        // 或者如果你使用对象扩展语法，可以写成：
        // var newPlayer = {...player, score: 2};
        最终结果是相同的，但通过不直接改变数据（或更改底层数据）有一个额外的好处，可以帮助我们增强组件和整体应用性能。

        更简单的撤消/重做和步骤重现（Easier Undo/Redo and Time Travel）
        不可变数据（Immutability）还使一些复杂的功能更容易实现。例如，在本教程中，我们将在游戏的不同阶段之间实现时间旅行。避免数据改变使我们能够保留对旧数据的引用，如果我们需要在它们之间切换。

        追踪变更（Tracking Changes）
        确定可变对象是否已更改是复杂的，因为直接对对象进行更改。这样就需要将当前对象与先前的副本进行比较，遍历整个对象树，并比较每个变量和值。这个过程可能变得越来越复杂。

        确定不可变对象如何改变是非常容易的。如果被引用的对象与之前不同，那么对象已经改变了。仅此而已。

        确定何时重新渲染（Determining When to Re-render in React）
        React 中不可变数据最大好处在于当您构建简单的 纯(pure)组件 时。由于不可变数据可以更容易地确定是否已经进行了更改，这也有助于确定组件何时需要重新渲染。

        要了解有关 shouldComponentUpdate() 的更多信息，以及如何构建 纯(pure)组件 ，请查看优化性能。
     */
