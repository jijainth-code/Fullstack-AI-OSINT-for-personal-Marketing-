import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Mydata = () => {
  return (
    <div className="flex justify-center items-center h-full">
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="full name" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Field of Study</Label>
                <Input id="name" placeholder="eg . Artificial Intelligence" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="name">Interests</Label>
                <Input id="name" placeholder="Give some of your selling points" />
              </div>
              
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button>Save Data</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Mydata;
