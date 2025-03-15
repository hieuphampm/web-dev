// Service Card Component
export function ServiceCard({ service, onClick }) {
    return (
      <Card className="cursor-pointer hover:shadow-lg" onClick={() => onClick(service)}>
        <CardHeader>
          <CardTitle>{service.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <p>${service.price}</p>
        </CardContent>
      </Card>
    );
  }