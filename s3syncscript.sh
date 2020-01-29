# aws s3 sync build/public s3://assets.auto-poc-new.co --exclude '*' --include "ads.txt" --include "robots.txt" --include="sw.js" --include="manifest.json" --cache-control "max-age=0, must-revalidate" --delete
# aws s3 sync build/public s3://assets.auto-poc-new.co  --exclude "static" --exclude "ads.txt" --exclude "robots.txt" --exclude "sw.js" --exclude="manifest.json" --cache-control="max-age=31536000, public" --delete --acl public-read
# aws s3 sync s3://assets.auto-poc-new.co s3://assets.auto-poc-new.co/br --exclude 'br/*' --acl public-read
# aws s3 sync build/public s3://assets.auto-poc-new.co --exclude '*' --exclude "br/ads.txt" --exclude "br/robots.txt" --exclude "br/sw.js" --exclude="br/manifest.json"  --include 'br/*' --cache-control="max-age=31536000, public" --content-encoding br --acl public-read

