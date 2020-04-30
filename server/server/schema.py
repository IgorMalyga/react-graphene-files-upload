import graphene
from graphene_file_upload.scalars import Upload


class UploadMutation(graphene.Mutation):
    class Arguments:
        file = Upload(required=True)

    success = graphene.Boolean()

    def mutate(self, info, file, **kwargs):
        print('A'*50, flush=True)
        print(file, flush=True)
        print(type(file), flush=True)

        return UploadMutation(success=True)


class Query(graphene.ObjectType):
    test = graphene.String()

    def resolve_test(self, info):
        return 'Hello, World!'


class Mutation(graphene.ObjectType):
    upload = UploadMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
