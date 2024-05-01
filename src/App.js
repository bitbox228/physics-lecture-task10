import React, {useEffect, useState} from 'react';
import Plot from 'react-plotly.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Row, Col, Form, Button} from 'react-bootstrap';

const App = () => {

    const [lambda, setLambda] = useState(10)
    const [n, setN] = useState(1)
    const [d, setD] = useState(10)
    const [l, setL] = useState(19)
    const [xx, setXx] = useState(1)

    const [i, setI] = useState()
    const [x, setX] = useState()


    const handleLambdaChange = (e) => {
        setLambda(parseFloat(e.target.value))
    }

    const handleNChange = (e) => {
        setN(parseFloat(e.target.value))
    }

    const handleDChange = (e) => {
        setD(parseFloat(e.target.value))
    }

    const handleLChange = (e) => {
        setL(parseFloat(e.target.value))
    }

    const handleXxChange = (e) => {
        setXx(parseFloat(e.target.value))
    }

    const checkForms = () => {
        if (lambda === '') {
            alert('Введите длину волны')
            return false
        }
        if (n === '') {
            alert('Введите показатель преломления среды')
            return false
        }
        if (d === '') {
            alert('Введите расстояние между щелями')
            return false
        }
        if (l === '') {
            alert('Введите расстояние до экрана')
            return false
        }
        if (xx === '') {
            alert('Введите длину оси x')
            return false
        }

        if (lambda < 1) {
            alert('Размер волны не может быть меньше размера атома')
            return false
        }
        if (n < 1) {
            alert('Показатель преломления среды не может быть меньше 1')
            return false
        }
        if (d < 0) {
            alert('Расстояние между щелями не может быть меньше 0')
            return false
        }
        if (l < 0) {
            alert('Расстояние до экрана не может быть меньше 0')
            return false
        }
        if (xx < 0) {
            alert('Длина оси x не может быть меньше 0')
            return false
        }

        return true
    }

    const handlePlotUpdate = () => {
        if (!checkForms()) {
            return
        }

        const len = 200
        const step = xx / len;

        const newX = Array.from({length: len}, (_, i) => -xx / 2 + i * step);
        const newI = newX.map(xxx => 4 * Math.pow(Math.cos(Math.PI * n * d * xxx / (lambda * Math.pow(10, -9) * l)), 2))

        setX(newX)
        setI(newI)
    }

    useEffect(() => {
        handlePlotUpdate()
    }, [])

    return (
        <div className={"container-fluid"}>
            <h1>Визуализация интерференционной картины. Опыт Юнга.</h1>
            <Row>
                <Col xs={12} md={3}>
                    <Form>
                        <div style={{marginBottom: '10px', marginTop: '70px'}}>
                            <Form.Group controlId="lambda">
                                <Form.Label>Длина волны, λ (нм)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={lambda}
                                    onChange={handleLambdaChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="n">
                                <Form.Label>Показатель преломления среды, n</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={n}
                                    onChange={handleNChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="d">
                                <Form.Label>Расстояние между щелями, d (м)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={d}
                                    onChange={handleDChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="l">
                                <Form.Label>Расстояние до экрана, l (м)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={l}
                                    onChange={handleLChange}
                                />
                            </Form.Group>
                        </div>
                        <div style={{marginBottom: '10px'}}>
                            <Form.Group controlId="xx">
                                <Form.Label>Длина оси x (м)</Form.Label>
                                <Form.Control
                                    type="number"
                                    value={xx}
                                    onChange={handleXxChange}
                                />
                            </Form.Group>
                        </div>
                        <div>
                            <Button variant="primary" onClick={handlePlotUpdate}>Построить</Button>
                        </div>
                    </Form>
                </Col>
                <Col xs={12} md={9}>
                    <Plot
                        data={[
                            {
                                z: [i],
                                x: x,
                                type: 'heatmap',
                                colorscale: [[0, 'white'], [1, 'black']]
                            }
                        ]}
                        layout={{
                            width: '1200',
                            height: '600'
                        }}
                    />
                </Col>
            </Row>
        </div>
    )
}

export default App