import "bootstrap/dist/css/bootstrap.min.css";
import "./Reserva.css";
import { PAYU } from "../../../environment";
import { useReserva } from "./useReserva";

export const Reserva = () => {
  const {
    categoriaTypes,
    formData,
    localTypes,
    paqueteTypes,
    reserva,
    handleChange,
    handleLocalChange,
  } = useReserva();

  return (
    <div className="reserva-page">
      <div className="container-form">
        <h2>¡¡RESERVA TUS EVENTOS!!</h2>
        <form
          method="post"
          action="https://sandbox.checkout.payulatam.com/ppp-web-gateway-payu/"
        >
          <input name="merchantId" type="hidden" value={PAYU.MERCHANT_ID} />
          <input name="accountId" type="hidden" value={PAYU.ACCOUNT_ID} />
          <input name="description" type="hidden" value={formData.descripcion} />
          <input
            name="referenceCode"
            type="hidden"
            value={formData.codigoReferencia}
          />
          <input name="amount" type="hidden" value={formData.precio} />
          <input name="tax" type="hidden" value="3193" />
          <input name="taxReturnBase" type="hidden" value="16806" />
          <input name="currency" type="hidden" value="COP" />
          <input name="signature" type="hidden" value={formData.firma} />
          <input name="test" type="hidden" value="0" />
          <input name="buyerEmail" type="hidden" value={formData.email} />
          <input name="extra1" type="hidden" value={reserva} />
          <input
            name="responseUrl"
            type="hidden"
            value={`${window.location.origin}/confirmacion`}
          />
          <input
            name="confirmationUrl"
            type="hidden"
            value={`${window.location.origin}/confirmacion`}
          />

          <div className="form-group">
            <label htmlFor="local">Lugar</label>
            <select
              className="form-select"
              id="local"
              name="local"
              value={formData.local}
              onChange={handleLocalChange}
              required
            >
              <option key="" value="">
                Seleccione el tipo
              </option>
              {localTypes.map((type) => (
                <option key={type.idLocal} value={type.idLocal}>
                  {type.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="paquete">Paquete</label>
            <select
              className="form-select"
              id="paquete"
              name="paquete"
              value={formData.paquete}
              onChange={handleChange}
              required
            >
              <option key="" value="">
                Seleccione el tipo
              </option>
              {paqueteTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.nombre}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="categoria">Categoría</label>
            <select
              className="form-select"
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              required
            >
              <option key="" value="">
                Seleccione el tipo
              </option>
              {categoriaTypes.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.descripcion}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="fechaHora">Fecha y Hora del evento</label>
            <input
              type="datetime-local"
              className="form-control"
              id="fechaHora"
              name="fechaHora"
              value={formData.fechaHora}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="precio">Precio</label>
            <input
              type="text"
              className="form-control"
              id="precio"
              name="precio"
              value={formData.precio}
              readOnly
              disabled
              required
            />
          </div>
          <div className="back-button">
            <a href="/Index">Cancelar</a>
          </div>

          <input
            className="reserva-button"
            name="Submit"
            type="submit"
            value="Reservar"
          />
        </form>
      </div>
    </div>
  );
};
