from fastapi import APIRouter, Response

router = APIRouter(tags=["warmup"])


@router.get("/warmup", status_code=204)
def warmup():
    return Response(status_code=204)
