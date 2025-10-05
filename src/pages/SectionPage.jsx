import { Link, useParams } from 'react-router-dom'
import { productsData } from '../data/products'

export default function SectionPage() {
  const { section } = useParams()

  if (!productsData[section]) return <p className="p-3">Sección no encontrada.</p>

  const subsections = Object.keys(productsData[section]).filter(key => key !== "portada")

  return (
    <div className="container mt-4">
      <h2>{section}</h2>
      <div className="row">
        {subsections.map(sub => {
          const subData = productsData[section][sub]
          return (

            <div key={sub} className="col-md-4 mb-3">
              <div className="card shadow-sm">
                <div className="card-body text-center">
                  <img
                    src={subData.portada}
                    alt={`Portada de ${sub}`}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <h5>{sub}</h5>
                  <Link to={`/section/${encodeURIComponent(section)}/${encodeURIComponent(sub)}`} className="btn btn-outline-success mt-2">
                    Ver {sub}
                  </Link>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
