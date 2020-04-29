import graphene


class Query(graphene.ObjectType):
    test = graphene.String()

    def resolve_test(self, info):
        return 'Hello, World!'


schema = graphene.Schema(query=Query)
