// inicia eventos
document.addEventListener('DOMContentLoaded', () => {
    let board = null; // se inicia tablero
    const game = new Chess(); // constante para iniciar una funcion en memoria
    const moveHistory = document.getElementById('move-history'); // obtener movimiento historico
    let moveCount = 1; // contador de movimientos
    let userColor = 'w'; // Iniciara el color blanco

    // movimientos random 
    const makeRandomMove = () => {
        const possibleMoves = game.moves();

        if (game.game_over()) {
            alert("hackemate!");
        } else {
            const randomIdx = Math.floor(Math.random() * possibleMoves.length);
            const move = possibleMoves[randomIdx];
            game.move(move);
            board.position(game.fen());
            recordMove(move, moveCount); // Record and display the move with move count
            moveCount++; // Increament the move count
        }
    };

    // tomar posición historica, en base a la ultima pocición tomar movimientos
    const recordMove = (move, count) => {
        const formattedMove = count % 2 === 1 ? `${Math.ceil(count / 2)}. ${move}` : `${move} -`;
        moveHistory.textContent += formattedMove + ' ';
        moveHistory.scrollTop = moveHistory.scrollHeight; // Auto-scroll to the latest move
    };
    
    const onDragStart = (source, piece) => {        
        return !game.game_over() && piece.search(userColor) === 0;
    };

    // eliminar posición en el tablero
    const onDrop = (source, target) => {
        const move = game.move({
            from: source,
            to: target,
            promotion: 'q',
        });

        if (move === null) return 'snapback';

        window.setTimeout(makeRandomMove, 250);
        recordMove(move.san, moveCount); // Record and display the move with move count
        moveCount++;
    };

    // Function to handle the end of a piece snap animation
    const onSnapEnd = () => {
        board.position(game.fen());
    };

    // Configuration del tablero
    const boardConfig = {
        showNotation: true,
        draggable: true,
        position: 'start',
        onDragStart,
        onDrop,
        onSnapEnd,
        moveSpeed: 'fast',
        snapBackSpeed: 500,
        snapSpeed: 100,
    };

    // iniciar tablero
    board = Chessboard('board', boardConfig);

    // renicia el juego
    document.querySelector('.play-again').addEventListener('click', () => {
        game.reset(); //restablecer tableros
        board.start(); //reinicia
        moveHistory.textContent = '';
        moveCount = 1;
        userColor = 'w'; //por defecto toma el color blanco 
    });

    //cerrar ventana actual
    document.querySelector('.close-window').addEventListener('click', () => {
        window.close();
    });

    // posiciones incorrectas
    document.querySelector('.set-pos').addEventListener('click', () => {
        const fen = prompt("Da click para asignar posición");
        if (fen !== null) {
            if (game.load(fen)) {
                board.position(fen);
                moveHistory.textContent = '';
                moveCount = 1;
                userColor = 'w';
            } else {
                alert("Posición clickeada no valida.");
            }
        }
    });

    // Rotar tableros
    document.querySelector('.flip-board').addEventListener('click', () => {
        board.flip();
        makeRandomMove();
        // prefijos de colores
        userColor = userColor === 'w' ? 'b' : 'w';
    });

});