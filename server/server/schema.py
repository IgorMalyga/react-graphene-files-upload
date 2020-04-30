import graphene
from graphene_django import DjangoObjectType
from graphene_file_upload.scalars import Upload


class CUDNewsBoard(graphene.Mutation):
    newsboard = graphene.String()

    class Arguments:  # other arguments up here...
        files = Upload()

    def mutate(self, info, files=None):
        # user = info.context.user

        # if not user.is_staff:
        #     raise Exception('Admin permission is required!')

        # post = NewsBoard(user=user, title=title, content=content)
        # post.save()

        if files:
            for file in files:
                print('A'*50, flush=True)
                print(file, flush=True)
                # postimage = NewsBoardImage(post=post, image=None)
                # postimage.save()

                # image_obj = Image.open(file)
                # # resize image
                # image_obj = resizeimage.resize_width(
                #     image_obj, 800, validate=False)

                # new_image_io = BytesIO()
                # image_obj.save(new_image_io, image_obj.format)

                # temp_name = file.name

                # postimage.image.save(
                #     temp_name,
                #     content=ContentFile(new_image_io.getvalue())
                # )

        return CUDNewsBoard(newsboard='Hello')


class UploadMutation(graphene.Mutation):
    class Arguments:
        file = Upload(required=True)

    success = graphene.Boolean()

    def mutate(self, info, file, **kwargs):
        # do something with your file
        print('A'*50, flush=True)
        print(file, flush=True)
        print(type(file), flush=True)

        return UploadMutation(success=True)


class Query(graphene.ObjectType):
    test = graphene.String()

    def resolve_test(self, info):
        return 'Hello, World!'


class Mutation(graphene.ObjectType):
    post_new = CUDNewsBoard.Field()
    upload = UploadMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
