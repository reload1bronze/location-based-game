import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('/api/feeds/:feedId/comments')
@ApiTags('댓글 API')
export class CommentsController {
  private logger = new Logger('CommentController');
  constructor(private readonly commentsService: CommentsService) {}

  // @Post()
  // create(@Body() createCommentDto: CreateCommentDto) {
  //   return this.commentsService.create(createCommentDto);
  // }

  /* 특정 게시글 댓글 조회 */
  @Get()
  @ApiOperation({ summary: '특정 게시글의 댓글 조회 API' })
  async findAllComments(@Param('feedId') feedId: number) {
    this.logger.verbose(`trying to get all comments feedId:  userId: `);
    try {
      const comments = await this.commentsService.findAllComments(feedId);
      return {
        ok: true,
        rows: comments,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }

  /* 특정 댓글 조회 */
  @Get(':commentId')
  @ApiOperation({ summary: '게시글의 특정 댓글 조회 API' })
  async findOneComment(@Param() params: number) {
    this.logger.verbose(`trying to get a comment feedId:  userId: `);
    try {
      const feedId = params['feedId'];
      const commentId = params['commentId'];
      const comment = await this.commentsService.findOneComment(commentId);
      return {
        ok: true,
        row: comment,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }

  /* 댓글 수정 */
  @Patch(':commentId')
  @ApiOperation({ summary: '댓글 수정 API' })
  updateComment(
    @Param() params: number,
    @Body() updateCommentDto: UpdateCommentDto
  ) {
    this.logger.verbose(`trying to update comment feedId:  userId: `);
    try {
      const feedId = params['feedId'];
      const commentId = params['commentId'];
      this.commentsService.updateComment(feedId, commentId, updateCommentDto);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }

  /* 댓글 삭제 */
  @Delete(':commentId')
  @ApiOperation({ summary: '댓글 삭제 API' })
  removeComment(@Param('commentId') commentId: number) {
    this.logger.verbose(`trying to delete comment feedId:  userId: `);
    try {
      this.commentsService.removeComment(commentId);
      return {
        ok: true,
      };
    } catch (error) {
      return {
        ok: false,
        message: error.message,
      };
    }
  }
}
