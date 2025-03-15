"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, Search } from "lucide-react";
import type { SlideContent } from "@/type";

interface SlideEditorProps {
  slide: SlideContent;
  onChange: (slide: SlideContent) => void;
  hasOpener: boolean;
}

export function SlideEditor({ slide, onChange, hasOpener }: SlideEditorProps) {
  const [showTenorSearch, setShowTenorSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<string[]>([]);

  

  const handleTypeChange = (type: string) => {
    // Create a new slide with the selected type and preserve common fields
    const newSlide: SlideContent = {
      ...slide,
      type: type as SlideContent["type"],
    };

    // Add type-specific default fields
    if (type === "Opener" && !newSlide.subparagraph) {
      newSlide.subparagraph = "";
    }

    if (type === "CodePara" && !newSlide.codeblock) {
      newSlide.codeblock = [{ codeparagraph: "", code: "" }];
    }

    onChange(newSlide);
  };

  const handleChange = (field: string, value: string) => {
    onChange({
      ...slide,
      [field]: value,
    });
  };

  const handleImageChange = (value: string) => {
    // Validate that the URL is from tenor.com
    if (value && !value.includes("tenor.com")) {
      alert("Only tenor.com image URLs are allowed");
      return;
    }

    onChange({
      ...slide,
      image: value,
    });
  };

  const addLink = () => {
    const links = slide.links || [];
    onChange({
      ...slide,
      links: [...links, { label: "", href: "" }],
    });
  };

  const updateLink = (
    index: number,
    field: "label" | "href",
    value: string
  ) => {
    const links = [...(slide.links || [])];
    links[index] = { ...links[index], [field]: value };
    onChange({
      ...slide,
      links,
    });
  };

  const removeLink = (index: number) => {
    const links = [...(slide.links || [])];
    links.splice(index, 1);
    onChange({
      ...slide,
      links: links.length > 0 ? links : undefined,
    });
  };

  const addCodeBlock = () => {
    if (!slide.codeblock) {
      onChange({
        ...slide,
        codeblock: [{ codeparagraph: "", code: "" }],
      });
      return;
    }

    onChange({
      ...slide,
      codeblock: [...slide.codeblock, { codeparagraph: "", code: "" }],
    });
  };

  const updateCodeBlock = (
    index: number,
    field: "codeparagraph" | "code",
    value: string
  ) => {
    if (!slide.codeblock) return;

    const codeblocks = [...slide.codeblock];
    codeblocks[index] = { ...codeblocks[index], [field]: value };

    onChange({
      ...slide,
      codeblock: codeblocks,
    });
  };

  const removeCodeBlock = (index: number) => {
    if (!slide.codeblock) return;

    const codeblocks = [...slide.codeblock];
    codeblocks.splice(index, 1);

    onChange({
      ...slide,
      codeblock: codeblocks.length > 0 ? codeblocks : undefined,
    });
  };

  const handleTenorSearch = () => {
    if (!searchTerm.trim()) return;

    // Simulate Tenor search results
    const mockResults = [
      "https://c.tenor.com/example1.gif",
      "https://c.tenor.com/example2.gif",
      "https://c.tenor.com/example3.gif",
      "https://c.tenor.com/example4.gif",
    ];

    setSearchResults(mockResults);
  };

  return (
    <div className="space-y-4">
      <div className="grid gap-2">
        <Label htmlFor="slideType">Slide Type</Label>
        <Select value={slide.type} onValueChange={handleTypeChange}>
          <SelectTrigger id="slideType">
            <SelectValue placeholder="Select slide type" />
          </SelectTrigger>
          <SelectContent className="bg-black text-white">
            <SelectItem value="Opener" disabled={hasOpener}>
              Opener
            </SelectItem>
            <SelectItem value="Para">Markdown</SelectItem>
            <SelectItem value="ParaSideImage">
              Paragraph with Side Image
            </SelectItem>
            <SelectItem value="ImagePara">Image with Paragraph</SelectItem>
            <SelectItem value="CodePara">Code with Paragraph</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          value={slide.title || ""}
          onChange={(e) => handleChange("title", e.target.value)}
          placeholder="Slide title (Optional)"
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="paragraph">Markdown</Label>
        <Textarea
          id="paragraph"
          value={slide.paragraph || ""}
          onChange={(e) => handleChange("paragraph", e.target.value)}
          placeholder="Main paragraph content (supports Markdown)"
          rows={5}
        />
        <p className="text-xs text-muted-foreground">
          Supports Markdown formatting: **bold**, *italic*, [links](url), etc.
        </p>
      </div>

      {slide.type === "Opener" && (
        <div className="grid gap-2">
          <Label htmlFor="subparagraph">Subparagraph</Label>
          <Textarea
            id="subparagraph"
            value={slide.subparagraph || ""}
            onChange={(e) => handleChange("subparagraph", e.target.value)}
            placeholder="Additional information (shown below main paragraph) (Swipe left or tap on right to start)"
            rows={2}
          />
        </div>
      )}

      {(slide.type === "ParaSideImage" ||
        slide.type === "ImagePara" ||
        slide.type === "CodePara") && (
        <div className="grid gap-2">
          <Label htmlFor="image">Image URL (Tenor only)</Label>
          <div className="flex gap-2">
            <Input
              id="image"
              value={slide.image || ""}
              onChange={(e) => handleImageChange(e.target.value)}
              placeholder="https://c.tenor.com/example.gif"
              className="flex-1"
            />
            {/* <Button
              type="button"
              variant="outline"
              onClick={() => setShowTenorSearch(!showTenorSearch)}
            >
              Search Tenor
            </Button> */}
          </div>
          <p className="text-xs text-muted-foreground">
            Only tenor.com URLs are allowed (e.g.,
            https://c.tenor.com/example.gif)
          </p>

          {/* {showTenorSearch && (
            <div className="border rounded-md p-4 mt-2">
              <div className="flex gap-2 mb-4">
                <Input
                  placeholder="Search Tenor GIFs..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1"
                />
                <Button type="button" onClick={handleTenorSearch}>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>

              {searchResults.length > 0 && (
                <div className="grid grid-cols-2 gap-2">
                  {searchResults.map((url, index) => (
                    <div
                      key={index}
                      className="border rounded p-2 cursor-pointer hover:bg-accent"
                      onClick={() => {
                        handleImageChange(url);
                        setShowTenorSearch(false);
                      }}
                    >
                      <div className="aspect-video bg-muted flex items-center justify-center">
                        <p className="text-xs text-center">
                          Tenor GIF {index + 1}
                        </p>
                      </div>
                      <p className="text-xs truncate mt-1">{url}</p>
                    </div>
                  ))}
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-2">
                Note: This is a simulated Tenor search. In a real
                implementation, you would integrate with Tenor's API.
              </p>
            </div>
          )} */}
        </div>
      )}

      {slide.type === "CodePara" && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label>Code Blocks</Label>
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={addCodeBlock}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Code Block
            </Button>
          </div>

          {slide.codeblock?.map((block, index) => (
            <div key={index} className="border rounded-md p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h4 className="font-medium">Code Block {index + 1}</h4>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCodeBlock(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`codeparagraph-${index}`}>Description</Label>
                <Textarea
                  id={`codeparagraph-${index}`}
                  value={block.codeparagraph || ""}
                  onChange={(e) =>
                    updateCodeBlock(index, "codeparagraph", e.target.value)
                  }
                  placeholder="Description for this code block (supports Markdown)"
                  rows={3}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor={`code-${index}`}>Code</Label>
                <Textarea
                  id={`code-${index}`}
                  value={block.code || ""}
                  onChange={(e) =>
                    updateCodeBlock(index, "code", e.target.value)
                  }
                  placeholder="Your code here"
                  rows={6}
                  className="font-mono"
                />
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label>Links</Label>
          <Button type="button" variant="outline" size="sm" onClick={addLink}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Link
          </Button>
        </div>

        {slide.links?.map((link, index) => (
          <div key={index} className="flex gap-2 items-end">
            <div className="grid gap-2 flex-1">
              <Label htmlFor={`link-label-${index}`}>Label</Label>
              <Input
                id={`link-label-${index}`}
                value={link.label}
                onChange={(e) => updateLink(index, "label", e.target.value)}
                placeholder="Link text"
              />
            </div>
            <div className="grid gap-2 flex-1">
              <Label htmlFor={`link-href-${index}`}>URL</Label>
              <Input
                id={`link-href-${index}`}
                value={link.href}
                onChange={(e) => updateLink(index, "href", e.target.value)}
                placeholder="https://example.com or /path"
              />
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => removeLink(index)}
            >
              <Trash2 className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
}
