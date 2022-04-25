import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button 
            className="square" 
            onClick={() => {this.props.onClick()}}>
                {this.props.value}
            </button>
        );
    }
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
            <div className="status">{this.props.status}</div>
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
    constructor(props){
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            stepNumber: 0,
            xIsNext: true
        }
    };

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        const tmpArr = current.squares.slice();
        if (tmpArr[i] || this.calculateWinner(tmpArr))
            return ;
        tmpArr[i] = this.state.xIsNext ? "X" : "O";

        this.setState({
            history: history.concat([{
                squares: tmpArr,
            }]),
            stepNumber: history.length,
            xIsNext: !this.state.xIsNext
        });
    };

    jumpTo(step){
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0
        })
    };

    calculateWinner(squares){
        const cases = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];

        // 이거는 외 안두엠?
        // for (let i = 0; i < cases.length; i++){
        //     const [a, b, c] =  cases[i];
        //     if (squares[a] === squares[b] === squares[c]){
        //         console.log("aaaaaa");
        //         return squares[a];
        //     }
        // }

        for (let i = 0; i < cases.length; i++){
            const [a, b, c] =  cases[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
                return squares[a];
            }
        }
        return null;
    };

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winner = this.calculateWinner(current.squares);
        let status;
        if (winner){
            status = "Winner is Here! " + (winner);
        }else{
            status = "Next player: " + (this.state.xIsNext ? "X" : "O");
        }
        let moves = history.map((step, move) => {
            const line = move ?
            "go To Move #" + (move) :
            "go To GameStart"
            return (
                <li key={move}>
                    <button onClick={() => {this.jumpTo(move)}}>
                        {line}
                    </button>
                </li>
            );
        });


        return (
        <div className="game">
            <div className="game-board">
                <Board 
                    squares={current.squares}
                    onClick={(i) => {this.handleClick(i)}}
                />
            </div>
            <div className="game-info">
            <div>{status}</div>
            <ol>{moves}</ol>
            </div>
        </div>
        );
    };
}

// ========================================

ReactDOM.render(
    <Game />,
    document.getElementById('root')
);
