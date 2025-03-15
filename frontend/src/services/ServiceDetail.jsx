// Service Detail Component
export function ServiceDetail({ service }) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Price: ${service.price}</p>
        </CardContent>
      </Card>
    );
  }
  