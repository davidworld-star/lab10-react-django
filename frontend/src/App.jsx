import { Component } from 'react'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import Table from '@mui/material/Table'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableBody from '@mui/material/TableBody'
import TableRow from '@mui/material/TableRow'
import TableCell from '@mui/material/TableCell'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import Alert from '@mui/material/Alert'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      productos: [],
      recuperado: false,
      descripcion: '',
      precio: '',
      error: '',
    }
    this.cambiar = this.cambiar.bind(this)
    this.agregar = this.agregar.bind(this)
  }

  componentDidMount() {
    this.cargar()
  }

  cargar() {
    fetch('http://localhost:8000/api/producto/')
      .then((r) => r.json())
      .then((prod) => this.setState({ productos: prod, recuperado: true }))
  }

  cambiar(e) {
    this.setState({ [e.target.name]: e.target.value, error: '' })
  }

  agregar(e) {
    e.preventDefault()
    fetch('http://localhost:8000/api/producto/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        descripcion: this.state.descripcion,
        precio: this.state.precio,
      }),
    })
      .then(async (r) => {
        const data = await r.json()
        if (!r.ok) {
          throw new Error(data.error || 'No se pudo agregar')
        }
        return data
      })
      .then(() => {
        this.setState({ descripcion: '', precio: '', error: '' })
        this.cargar()
      })
      .catch((err) => this.setState({ error: err.message }))
  }

  mostrarTabla() {
    return (
      <Container maxWidth="md" sx={{ mt: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Productos
        </Typography>
        <Stack
          component="form"
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          sx={{ mb: 2 }}
          onSubmit={this.agregar}
        >
          <TextField
            label="Descripción"
            name="descripcion"
            value={this.state.descripcion}
            onChange={this.cambiar}
            size="small"
          />
          <TextField
            label="Precio"
            name="precio"
            type="number"
            value={this.state.precio}
            onChange={this.cambiar}
            size="small"
          />
          <Button type="submit" variant="contained">
            Agregar
          </Button>
        </Stack>
        {this.state.error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {this.state.error}
          </Alert>
        )}
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Código</TableCell>
                <TableCell>Descripción</TableCell>
                <TableCell>Precio</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.productos.map((prod) => (
                <TableRow key={prod.codigo}>
                  <TableCell>{prod.codigo}</TableCell>
                  <TableCell>{prod.descripcion}</TableCell>
                  <TableCell>{prod.precio}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    )
  }

  render() {
    if (this.state.recuperado) {
      return this.mostrarTabla()
    }
    return <div>recuperando datos...</div>
  }
}

export default App
