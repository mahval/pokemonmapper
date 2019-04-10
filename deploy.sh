export AWS_PROFILE=mahval
aws s3 sync --acl public-read --exclude='index.html' --sse --delete dist/pokemon-mapper s3://pokemon-mapper
aws s3 sync --sse --acl public-read dist/pokemon-mapper s3://pokemon-mapper --cache-control 'max-age=0'