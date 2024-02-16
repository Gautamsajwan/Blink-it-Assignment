import Card from "./Card";

function RenderCards({ data, title }) {
  if(data?.length > 0) {
    return data.map((image) => <Card key={image._id} {...image} />)
  }
  return <h2>{title}</h2>
}

export default RenderCards;